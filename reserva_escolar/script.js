// URL de tu Google Apps Script - ACTUALIZADA
const SCRIPT_URL = 'https://script.google.com/a/mendoza.edu.ar/macros/s/AKfycbynXcELS6g5B_PtyRpX9gmE6EP0LyGaX8bFb2f4mvhf/dev';

// Configurar fecha mínima y cargar reservas cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Página cargada, inicializando...');
  const hoy = new Date();
  document.getElementById('fecha').min = hoy.toISOString().split('T')[0];
  cargarReservasExistentes();
});

// Manejo del formulario con detección de conflictos
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('📝 Formulario enviado, iniciando proceso...');
  
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  
  // Validaciones básicas
  if (document.getElementById('retiro').value >= document.getElementById('entrega').value) {
    console.error('⚠️ Error de validación: hora de entrega debe ser posterior');
    showMessage('⚠️ La hora de entrega debe ser posterior a la hora de retiro', 'error');
    return;
  }
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>⏳ Verificando...</span>';
  loading.style.display = 'block';

  const data = {
    nombre: document.getElementById('nombre').value.trim(),
    asignatura: document.getElementById('asignatura').value.trim(),
    fecha: document.getElementById('fecha').value,
    retiro: document.getElementById('retiro').value,
    entrega: document.getElementById('entrega').value,
    proyector: document.getElementById('proyector').checked ? 'Sí' : 'No',
    pizarra: document.getElementById('pizarra').checked ? 'Sí' : 'No'
  };

  console.log('📤 Enviando datos:', data);
  console.log('🔗 URL destino:', SCRIPT_URL);

  // Enviar datos y procesar respuesta JSON del servidor
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    // Agregamos opciones adicionales para debugging
    mode: 'cors',
    cache: 'no-cache'
  })
  .then(response => {
    console.log('📥 Respuesta recibida, status:', response.status);
    console.log('📥 Response OK:', response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.text(); // Primero como texto para ver qué llega
  })
  .then(responseText => {
    console.log('📄 Respuesta como texto:', responseText);
    
    // Intentar parsear como JSON
    try {
      const response = JSON.parse(responseText);
      console.log('✅ Respuesta parseada:', response);
      
      if (response.status === 'success') {
        showMessage('✅ ¡Reserva confirmada exitosamente!', 'success');
        document.getElementById('reservaForm').reset();
        const hoy = new Date();
        document.getElementById('fecha').min = hoy.toISOString().split('T')[0];
        cargarReservasExistentes();
      } else if (response.status === 'conflict') {
        showMessage(`⌚ HORARIO OCUPADO: ${response.message}. Por favor, elige otro horario.`, 'error');
      } else {
        throw new Error(response.message || 'Ocurrió un error desconocido.');
      }
    } catch (parseError) {
      console.error('❌ Error parseando JSON:', parseError);
      console.error('📄 Contenido que no se pudo parsear:', responseText);
      throw new Error('La respuesta del servidor no es válida');
    }
  })
  .catch(error => {
    console.error('❌ Error completo:', error);
    console.error('❌ Tipo de error:', error.name);
    console.error('❌ Mensaje de error:', error.message);
    console.error('❌ Stack trace:', error.stack);
    
    let mensajeError = 'Hubo un problema al enviar la reserva.';
    
    if (error.message.includes('CORS')) {
      mensajeError += ' Error de CORS - verifica la configuración del script.';
    } else if (error.message.includes('Failed to fetch')) {
      mensajeError += ' No se pudo conectar al servidor.';
    } else if (error.message.includes('HTTP')) {
      mensajeError += ' Error del servidor: ' + error.message;
    } else {
      mensajeError += ' Detalles: ' + error.message;
    }
    
    showMessage('❌ ' + mensajeError, 'error');
  })
  .finally(() => {
    console.log('🔄 Proceso completado, restaurando botón...');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Confirmar Reserva</span>';
    loading.style.display = 'none';
  });
});

// Mostrar mensajes de estado
function showMessage(message, type) {
  console.log(`💬 Mostrando mensaje (${type}):`, message);
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  statusMessage.style.display = 'block';
  
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 7000);
}

// Cargar las reservas existentes desde el servidor
function cargarReservasExistentes() {
  console.log('📋 Cargando reservas existentes...');
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = `<li class="placeholder">⏳ Cargando reservas existentes...</li>`;

  const urlGet = SCRIPT_URL + '?t=' + new Date().getTime();
  console.log('🔗 URL para GET:', urlGet);

  fetch(urlGet, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache'
  })
    .then(response => {
      console.log('📥 GET Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(reservas => {
      console.log('📋 Reservas recibidas:', reservas);
      lista.innerHTML = '';
      if (Array.isArray(reservas) && reservas.length > 0) {
        reservas.slice().reverse().forEach(reserva => {
          const li = document.createElement('li');
          li.className = 'reserva-item';
          
          li.innerHTML = `
            <div class="reserva-header">
              <div>
                <div class="reserva-docente">${reserva.nombre}</div>
                <div class="reserva-asignatura">${reserva.asignatura}</div>
              </div>
            </div>
            <div class="reserva-details">
              <div class="detail-item">
                <span>📅</span>
                <span>${formatearFecha(reserva.fecha)}</span>
              </div>
              <div class="detail-item">
                <span>🕐</span>
                <span>${reserva.retiro} - ${reserva.entrega}</span>
              </div>
            </div>
            <div class="reserva-recursos">
              <span class="recurso-tag ${reserva.proyector === 'Sí' ? 'activo' : 'inactivo'}">Proyector</span>
              <span class="recurso-tag ${reserva.pizarra === 'Sí' ? 'activo' : 'inactivo'}">Pizarra</span>
            </div>
            ${reserva.timestamp ? `<div class="reserva-timestamp">Registrado: ${reserva.timestamp}</div>` : ''}
          `;
          lista.appendChild(li);
        });
      } else {
        lista.innerHTML = `<li class="placeholder">📋 No hay reservas registradas.</li>`;
      }
    })
    .catch(error => {
      console.error('❌ Error al cargar reservas:', error);
      lista.innerHTML = `<li class="placeholder error">⚠️ No se pudieron cargar las reservas: ${error.message}</li>`;
    });
}

// Función para formatear la fecha
function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr + 'T00:00:00');
  return fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

// Función para recargar las reservas manualmente
function recargarReservas() {
  console.log('🔄 Recarga manual de reservas solicitada');
  const btn = document.querySelector('.btn-refresh');
  btn.disabled = true;
  btn.querySelector('span:last-child').textContent = 'Cargando...';
  
  cargarReservasExistentes();
  
  setTimeout(() => {
    btn.disabled = false;
    btn.querySelector('span:last-child').textContent = 'Actualizar';
  }, 1500);
}