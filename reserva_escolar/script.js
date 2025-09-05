// URL de tu Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz9qLxOGOH5QCiWvrjaEamxw5xJwVYCfqfUyHH4nLTzIkr8Bq_cku1DwuXzvwHCQYPB6A/exec';

// Configurar fecha mínima y cargar reservas cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  const hoy = new Date();
  document.getElementById('fecha').min = hoy.toISOString().split('T')[0];
  cargarReservasExistentes();
});

// Manejo del formulario con detección de conflictos
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  
  // Validaciones básicas
  if (document.getElementById('retiro').value >= document.getElementById('entrega').value) {
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

  // Enviar datos y procesar respuesta JSON del servidor
  fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.json())
  .then(response => {
    if (response.status === 'success') {
      showMessage('✅ ¡Reserva confirmada exitosamente!', 'success');
      document.getElementById('reservaForm').reset();
      const hoy = new Date();
      document.getElementById('fecha').min = hoy.toISOString().split('T')[0];
      cargarReservasExistentes();
    } else if (response.status === 'conflict') {
      showMessage(`❌ HORARIO OCUPADO: ${response.message}. Por favor, elige otro horario.`, 'error');
    } else {
      throw new Error(response.message || 'Ocurrió un error desconocido.');
    }
  })
  .catch(error => {
    console.error('❌ Error en la solicitud:', error);
    showMessage('❌ Hubo un problema al enviar la reserva. Inténtalo de nuevo.', 'error');
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Confirmar Reserva</span>';
    loading.style.display = 'none';
  });
});

// Mostrar mensajes de estado
function showMessage(message, type) {
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  statusMessage.style.display = 'block';
  
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 7000); // Aumentado a 7 segundos para mensajes largos de conflicto
}

// Cargar las reservas existentes desde el servidor
function cargarReservasExistentes() {
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = `<li class="placeholder">⏳ Cargando reservas existentes...</li>`;

  fetch(SCRIPT_URL + '?t=' + new Date().getTime()) // Agrega timestamp para evitar caché
    .then(response => response.json())
    .then(reservas => {
      lista.innerHTML = '';
      if (Array.isArray(reservas) && reservas.length > 0) {
        reservas.slice().reverse().forEach(reserva => { // Usamos slice() para no modificar el array original
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
      lista.innerHTML = `<li class="placeholder error">⚠️ No se pudieron cargar las reservas.</li>`;
    });
}

// Función para formatear la fecha
function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr + 'T00:00:00'); // Asegura que se interprete como local
  return fecha.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
}

// Función para recargar las reservas manualmente
function recargarReservas() {
  const btn = document.querySelector('.btn-refresh');
  btn.disabled = true;
  btn.querySelector('span:last-child').textContent = 'Cargando...';
  
  cargarReservasExistentes();
  
  setTimeout(() => {
    btn.disabled = false;
    btn.querySelector('span:last-child').textContent = 'Actualizar';
  }, 1500);
}
