// URL de tu Google Apps Script - CORREGIDA
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxQbT4uiVSLaM4GRRX9WZcPR1E5hh1sa6pCeJsjr9dUsyZV0NhBVdg3MMYXBm1hfQ3mmg/exec';

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
    mode: 'cors',
    cache: 'no-cache'
  })
  .then(response => {
    console.log('📥 Respuesta recibida, status:', response.status);
    console.log('📥 Response OK:', response.ok);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.text();
  })
  .then(responseText => {
    console.log('📄 Respuesta como texto:', responseText);
    
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
  lista.innerHTML = `<li class="placeholder"><span class="placeholder-icon">⏳</span><div>Cargando reservas existentes...</div></li>`;

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
      console.log('📊 Número de reservas:', reservas.length);
      
      lista.innerHTML = '';
      
      if (Array.isArray(reservas) && reservas.length > 0) {
        // Filtrar la primera fila si parece ser encabezado
        const reservasFiltradas = reservas.filter(reserva => {
          return reserva.nombre !== 'Nombre del Docente' && 
                 reserva.asignatura !== 'Asignatura';
        });
        
        console.log('📋 Reservas después de filtrar:', reservasFiltradas.length);
        
        if (reservasFiltradas.length > 0) {
          reservasFiltradas.slice().reverse().forEach((reserva, index) => {
            console.log(`📝 Procesando reserva ${index + 1}:`, reserva);
            
            const li = document.createElement('li');
            li.className = 'reserva-item';
            
            // Validar que los datos estén completos
            const nombre = reserva.nombre || 'Sin nombre';
            const asignatura = reserva.asignatura || 'Sin asignatura';
            const fecha = reserva.fecha || 'Sin fecha';
            const retiro = reserva.retiro || '00:00';
            const entrega = reserva.entrega || '00:00';
            const proyector = reserva.proyector || 'No';
            const pizarra = reserva.pizarra || 'No';
            
            li.innerHTML = `
              <div class="reserva-header">
                <div>
                  <div class="reserva-docente">${nombre}</div>
                  <div class="reserva-asignatura">${asignatura}</div>
                </div>
              </div>
              <div class="reserva-details">
                <div class="detail-item">
                  <span>📅</span>
                  <span>${formatearFecha(fecha)}</span>
                </div>
                <div class="detail-item">
                  <span>🕐</span>
                  <span>${retiro} - ${entrega}</span>
                </div>
              </div>
              <div class="reserva-recursos">
                <span class="recurso-tag ${proyector === 'Sí' ? 'activo' : 'inactivo'}">Proyector</span>
                <span class="recurso-tag ${pizarra === 'Sí' ? 'activo' : 'inactivo'}">Pizarra</span>
              </div>
              ${reserva.timestamp ? `<div class="reserva-timestamp">Registrado: ${formatearTimestamp(reserva.timestamp)}</div>` : ''}
            `;
            lista.appendChild(li);
          });
        } else {
          lista.innerHTML = `<li class="placeholder"><span class="placeholder-icon">📋</span><div>No hay reservas válidas para mostrar.</div></li>`;
        }
      } else {
        lista.innerHTML = `<li class="placeholder"><span class="placeholder-icon">📋</span><div>No hay reservas registradas.</div></li>`;
      }
    })
    .catch(error => {
      console.error('❌ Error al cargar reservas:', error);
      lista.innerHTML = `<li class="placeholder error"><span class="placeholder-icon">⚠️</span><div>No se pudieron cargar las reservas: ${error.message}</div></li>`;
    });
}

// Función para formatear la fecha
function formatearFecha(fechaStr) {
  try {
    if (!fechaStr || fechaStr === 'Sin fecha') return 'Fecha no válida';
    
    const fecha = new Date(fechaStr + 'T00:00:00');
    if (isNaN(fecha.getTime())) return fechaStr; // Si no se puede parsear, devolver original
    
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return fechaStr;
  }
}

// Función para formatear timestamp
function formatearTimestamp(timestamp) {
  try {
    if (!timestamp) return '';
    
    const fecha = new Date(timestamp);
    if (isNaN(fecha.getTime())) return timestamp;
    
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formateando timestamp:', error);
    return timestamp;
  }
}

// Función para recargar las reservas manualmente
function recargarReservas() {
  console.log('🔄 Recarga manual de reservas solicitada');
  const btn = document.querySelector('.btn-refresh');
  if (btn) {
    btn.disabled = true;
    const textElement = btn.querySelector('span:last-child');
    if (textElement) {
      textElement.textContent = 'Cargando...';
    }
  }
  
  cargarReservasExistentes();
  
  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      const textElement = btn.querySelector('span:last-child');
      if (textElement) {
        textElement.textContent = 'Actualizar';
      }
    }
  }, 1500);
}