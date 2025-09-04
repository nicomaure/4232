// IMPORTANTE: Reemplaza esta URL por la URL de tu Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPCDUDuO0I3XsanyjMeIlOD8sdF9GFB9Nif2RmYkuENFSw6A9tKvOG75Jeya7oSdfgiQ/exec';

// Configurar fecha mínima (hoy) cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fecha').min = new Date().toISOString().split('T')[0];
});

document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  const statusMessage = document.getElementById('statusMessage');
  
  // Validar que la hora de entrega sea posterior a la de retiro
  const retiro = document.getElementById('retiro').value;
  const entrega = document.getElementById('entrega').value;
  
  if (retiro >= entrega) {
    showMessage('La hora de entrega debe ser posterior a la hora de retiro', 'error');
    return;
  }

  // Deshabilitar botón y mostrar loading
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';
  loading.style.display = 'block';
  statusMessage.style.display = 'none';

  const data = {
    nombre: document.getElementById('nombre').value.trim(),
    asignatura: document.getElementById('asignatura').value.trim(),
    fecha: document.getElementById('fecha').value,
    retiro: document.getElementById('retiro').value,
    entrega: document.getElementById('entrega').value,
    proyector: document.getElementById('proyector').checked ? 'Sí' : 'No',
    pizarra: document.getElementById('pizarra').checked ? 'Sí' : 'No'
  };

  console.log('Datos a enviar:', data);

  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Importante para Google Apps Script
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    // Con mode: 'no-cors', no podemos leer la respuesta
    // Asumimos que fue exitoso si no hubo error de red
    showMessage('¡Reserva enviada exitosamente!', 'success');
    document.getElementById('reservaForm').reset();
    
    // Agregar a la lista local para feedback inmediato
    agregarReservaALista(data);
  })
  .catch(error => {
    console.error('Error:', error);
    showMessage('Hubo un problema al enviar la reserva. Por favor, verifica tu conexión e inténtalo de nuevo.', 'error');
  })
  .finally(() => {
    // Rehabilitar botón y ocultar loading
    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar Reserva';
    loading.style.display = 'none';
  });
});

function showMessage(message, type) {
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message;
  statusMessage.className = 'status-message ' + type;
  statusMessage.style.display = 'block';
  
  // Ocultar mensaje después de 5 segundos
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 5000);
}

function agregarReservaALista(data) {
  const lista = document.getElementById('listaReservas');
  
  // Limpiar mensaje inicial si existe
  const placeholder = lista.querySelector('.placeholder');
  if (placeholder) {
    placeholder.remove();
  }
  
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${data.nombre}</strong> - ${data.asignatura}<br>
    <small>Fecha: ${formatearFecha(data.fecha)} | ${data.retiro} - ${data.entrega}</small><br>
    <small>Proyector: ${data.proyector} | Pizarra: ${data.pizarra}</small>
  `;
  
  // Insertar al principio de la lista
  lista.insertBefore(li, lista.firstChild);
}

function formatearFecha(fecha) {
  const date = new Date(fecha + 'T00:00:00');
  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  
  try {
    return date.toLocaleDateString('es-ES', opciones);
  } catch (error) {
    // Fallback si hay problemas con el formato
    return fecha;
  }
}

// Función opcional para cargar reservas existentes
function cargarReservasExistentes() {
  fetch(SCRIPT_URL + '?action=get', {
    method: 'GET',
    mode: 'cors'
  })
  .then(response => response.json())
  .then(reservas => {
    if (Array.isArray(reservas) && reservas.length > 0) {
      const lista = document.getElementById('listaReservas');
      const placeholder = lista.querySelector('.placeholder');
      if (placeholder) {
        placeholder.remove();
      }
      
      reservas.reverse().forEach(reserva => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${reserva.nombre}</strong> - ${reserva.asignatura}<br>
          <small>Fecha: ${reserva.fecha} | ${reserva.retiro} - ${reserva.entrega}</small><br>
          <small>Proyector: ${reserva.proyector} | Pizarra: ${reserva.pizarra}</small>
        `;
        lista.appendChild(li);
      });
    }
  })
  .catch(error => {
    console.log('No se pudieron cargar las reservas existentes:', error);
  });
}

// Cargar reservas al cargar la página (opcional)
// window.addEventListener('load', cargarReservasExistentes);