// IMPORTANTE: Reemplaza esta URL por la URL de tu Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPCDUDuO0I3XsanyjMeIlOD8sdF9GFB9Nif2RmYkuENFSw6A9tKvOG75Jeya7oSdfgiQ/exec';

// Configurar fecha mínima (hoy) y cargar reservas cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('fecha').min = new Date().toISOString().split('T')[0];
  cargarReservasExistentes();
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
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    showMessage('¡Reserva enviada exitosamente!', 'success');
    document.getElementById('reservaForm').reset();
    
    // Recargar la lista completa después de enviar
    setTimeout(() => {
      cargarReservasExistentes();
    }, 1000);
  })
  .catch(error => {
    console.error('Error:', error);
    showMessage('Hubo un problema al enviar la reserva. Por favor, verifica tu conexión e inténtalo de nuevo.', 'error');
  })
  .finally(() => {
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
  
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 5000);
}

function formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha';
  
  console.log('Formateando fecha:', fecha, typeof fecha);
  
  // Si es un objeto Date, convertirlo a string
  if (fecha instanceof Date) {
    fecha = fecha.toISOString().split('T')[0];
  }
  
  // Convertir a string si no lo es
  fecha = fecha.toString();
  
  // Si ya viene formateada de Google Sheets (dd/mm/yyyy)
  if (fecha.includes('/')) {
    try {
      const partes = fecha.split('/');
      if (partes.length === 3) {
        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10);
        const año = parseInt(partes[2], 10);
        
        if (!isNaN(dia) && !isNaN(mes) && !isNaN(año)) {
          const fechaObj = new Date(año, mes - 1, dia);
          
          return fechaObj.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      }
    } catch (error) {
      console.log('Error al formatear fecha dd/mm/yyyy:', error);
    }
  }
  
  // Si es formato ISO (yyyy-mm-dd)
  if (fecha.includes('-')) {
    try {
      const partes = fecha.split('-');
      if (partes.length === 3) {
        const año = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10);
        const dia = parseInt(partes[2], 10);
        
        if (!isNaN(dia) && !isNaN(mes) && !isNaN(año)) {
          const fechaObj = new Date(año, mes - 1, dia);
          
          return fechaObj.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      }
    } catch (error) {
      console.log('Error al formatear fecha ISO:', error);
    }
  }
  
  // Fallback: intentar crear Date directamente
  try {
    const fechaObj = new Date(fecha);
    if (!isNaN(fechaObj.getTime())) {
      return fechaObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  } catch (error) {
    console.log('Error en fallback de fecha:', error);
  }
  
  // Si todo falla, retornar la fecha original
  return fecha;
}

function formatearHora(hora) {
  if (!hora || hora.length === 0) return 'Sin hora';
  
  // Si es un objeto Date de Google Sheets
  if (hora instanceof Date) {
    return hora.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
  
  // Convertir a string
  hora = hora.toString();
  
  // Si contiene información de fecha completa, extraer solo la hora
  if (hora.includes('T')) {
    try {
      const date = new Date(hora);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch (error) {
      console.log('Error al formatear hora completa:', error);
    }
  }
  
  // Si ya es formato HH:MM o HH:MM:SS
  if (hora.includes(':')) {
    return hora.substring(0, 5); // Solo HH:MM
  }
  
  return hora;
}

function esReservaValida(reserva) {
  if (!reserva || !reserva.nombre || !reserva.asignatura) return false;
  
  // Filtrar entradas que parecen ser encabezados o datos de prueba
  const nombre = reserva.nombre.toString().toLowerCase();
  const asignatura = reserva.asignatura.toString().toLowerCase();
  
  if (nombre.includes('nombre') || 
      nombre.includes('docente') ||
      asignatura.includes('asignatura') ||
      nombre.trim().length === 0 ||
      asignatura.trim().length === 0) {
    return false;
  }
  
  return true;
}

function cargarReservasExistentes() {
  const lista = document.getElementById('listaReservas');
  const placeholder = lista.querySelector('.placeholder');
  
  if (placeholder) {
    placeholder.textContent = 'Cargando reservas existentes...';
    placeholder.style.color = '#007BFF';
  }

  console.log('Intentando cargar reservas existentes...');
  
  fetch(SCRIPT_URL + '?action=getReservas&t=' + Date.now(), {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log('Respuesta recibida:', response.status);
    if (!response.ok) {
      throw new Error('Error en la respuesta: ' + response.status);
    }
    return response.json();
  })
  .then(reservas => {
    console.log('Reservas recibidas:', reservas);
    
    lista.innerHTML = '';
    
    if (Array.isArray(reservas) && reservas.length > 0) {
      const reservasValidas = reservas.filter(esReservaValida);
      
      console.log('Reservas válidas filtradas:', reservasValidas.length);
      
      if (reservasValidas.length > 0) {
        reservasValidas.reverse().forEach(reserva => {
          const li = document.createElement('li');
          li.innerHTML = `
            <div class="reserva-info">
              <strong>${reserva.nombre}</strong> - <em>${reserva.asignatura}</em>
            </div>
            <div class="reserva-detalles">
              <small><strong>Fecha:</strong> ${formatearFecha(reserva.fecha)}</small><br>
              <small><strong>Horario:</strong> ${formatearHora(reserva.retiro)} - ${formatearHora(reserva.entrega)}</small><br>
              <small><strong>Recursos:</strong> Proyector: ${reserva.proyector || 'No'} | Pizarra: ${reserva.pizarra || 'No'}</small>
              ${reserva.timestamp ? `<br><small class="timestamp">Registrado: ${reserva.timestamp}</small>` : ''}
            </div>
          `;
          lista.appendChild(li);
        });
      } else {
        mostrarMensajeSinReservas();
      }
    } else {
      mostrarMensajeSinReservas();
    }
  })
  .catch(error => {
    console.error('Error al cargar reservas:', error);
    
    lista.innerHTML = '';
    const li = document.createElement('li');
    li.className = 'placeholder error';
    li.innerHTML = `
      <span style="color: #dc3545;">⚠️ No se pudieron cargar las reservas existentes</span><br>
      <small style="color: #6c757d;">Las nuevas reservas aparecerán aquí después de enviarlas</small>
    `;
    lista.appendChild(li);
  });
}

function mostrarMensajeSinReservas() {
  const lista = document.getElementById('listaReservas');
  const li = document.createElement('li');
  li.className = 'placeholder';
  li.innerHTML = `
    <span style="color: #6c757d;">📋 No hay reservas registradas aún</span><br>
    <small>Las reservas aparecerán aquí una vez que se envíen</small>
  `;
  lista.appendChild(li);
}

function recargarReservas() {
  console.log('Recargando reservas manualmente...');
  cargarReservasExistentes();
}