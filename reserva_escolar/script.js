// IMPORTANTE: Reemplaza esta URL por la URL de tu Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxPCDUDuO0I3XsanyjMeIlOD8sdF9GFB9Nif2RmYkuENFSw6A9tKvOG75Jeya7oSdfgiQ/exec';

// Configurar fecha mínima y cargar reservas cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  // Obtener fecha actual más tolerante
  const hoy = new Date();
  // Permitir fechas desde hace 30 días para ser más flexible
  const fechaMinima = new Date(hoy.getTime() - (30 * 24 * 60 * 60 * 1000));
  document.getElementById('fecha').min = fechaMinima.toISOString().split('T')[0];
  
  console.log('🗓️ Fecha del sistema:', hoy.toISOString());
  console.log('📅 Fecha mínima permitida:', fechaMinima.toISOString().split('T')[0]);
  
  // Agregar listeners para validación
  document.getElementById('fecha').addEventListener('change', validarHorariosMinimosPorFecha);
  document.getElementById('retiro').addEventListener('change', validarHorariosMinimosPorFecha);
  
  // Cargar reservas
  cargarReservasExistentes();
  
  // Mejorar UX en móviles
  if (window.innerWidth <= 768) {
    document.body.style.userSelect = 'none';
  }
});

// Validar horarios mínimos SOLO para el mismo día
function validarHorariosMinimosPorFecha() {
  const fechaSeleccionada = document.getElementById('fecha').value;
  const inputRetiro = document.getElementById('retiro');
  
  if (!fechaSeleccionada) return;
  
  const hoy = new Date();
  const fechaHoy = hoy.toISOString().split('T')[0];
  const fechaSeleccionadaObj = new Date(fechaSeleccionada + 'T00:00:00');
  
  console.log('📅 Fecha seleccionada:', fechaSeleccionada);
  console.log('📅 Fecha de hoy:', fechaHoy);
  
  // Calcular diferencia en días de manera más precisa
  const diferenciaEnDias = Math.floor((fechaSeleccionadaObj.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  console.log('📊 Diferencia en días:', diferenciaEnDias);
  
  // SOLO aplicar restricción si es exactamente HOY
  if (fechaSeleccionada === fechaHoy) {
    const horaMinima = new Date(hoy.getTime() + 30 * 60000); // 30 minutos después
    const horaminimaString = horaMinima.toTimeString().slice(0, 5);
    
    inputRetiro.min = horaminimaString;
    console.log('⏰ Aplicando restricción de hora mínima para HOY:', horaminimaString);
    
    if (inputRetiro.value && inputRetiro.value < horaminimaString) {
      showMessage(`⚠️ Para reservas de hoy, la hora de retiro debe ser posterior a las ${horaminimaString}`, 'error');
    }
  } else {
    // Para cualquier otra fecha (mañana, pasado mañana, etc.), NO hay restricción
    inputRetiro.removeAttribute('min');
    console.log('✅ Sin restricción de hora para fecha:', fechaSeleccionada, '(no es hoy)');
  }
}

// Manejo del formulario
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  const statusMessage = document.getElementById('statusMessage');
  
  // Obtener valores
  const fecha = document.getElementById('fecha').value;
  const retiro = document.getElementById('retiro').value;
  const entrega = document.getElementById('entrega').value;
  
  // Validaciones básicas
  if (retiro >= entrega) {
    showMessage('⚠️ La hora de entrega debe ser posterior a la hora de retiro', 'error');
    return;
  }

  // Validación SOLO para el mismo día
  const hoy = new Date();
  const fechaHoy = hoy.toISOString().split('T')[0];
  
  // SOLO validar los 30 minutos si es exactamente HOY
  if (fecha === fechaHoy) {
    const ahora = new Date();
    const horaMinima = new Date(ahora.getTime() + 30 * 60000);
    const horaminimaString = horaMinima.toTimeString().slice(0, 5);
    
    if (retiro < horaminimaString) {
      const confirmar = confirm(`⚠️ La hora de retiro (${retiro}) es muy próxima a la hora actual.\n\nSe recomienda al menos 30 minutos de anticipación (${horaminimaString}).\n\n¿Deseas continuar de todos modos?`);
      if (!confirmar) return;
    }
  } else {
    // Para fechas futuras, no validar restricción de tiempo
    console.log('✅ Reserva para fecha futura, sin restricción de tiempo:', fecha);
  }

  // Mostrar loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<span>⏳ Enviando...</span>';
  loading.style.display = 'block';
  statusMessage.style.display = 'none';

  // Preparar datos
  const data = {
    nombre: document.getElementById('nombre').value.trim(),
    asignatura: document.getElementById('asignatura').value.trim(),
    fecha: fecha,
    retiro: retiro,
    entrega: entrega,
    proyector: document.getElementById('proyector').checked ? 'Sí' : 'No',
    pizarra: document.getElementById('pizarra').checked ? 'Sí' : 'No'
  };

  console.log('📤 Datos a enviar:', data);

  // Enviar datos
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    showMessage('✅ ¡Reserva enviada exitosamente!', 'success');
    document.getElementById('reservaForm').reset();
    
    // Restablecer fecha mínima
    const hoy = new Date();
    const fechaMinima = new Date(hoy.getTime() - (30 * 24 * 60 * 60 * 1000));
    document.getElementById('fecha').min = fechaMinima.toISOString().split('T')[0];
    
    // Recargar reservas
    setTimeout(() => {
      cargarReservasExistentes();
    }, 1000);
  })
  .catch(error => {
    console.error('❌ Error:', error);
    showMessage('❌ Hubo un problema al enviar la reserva. Por favor, verifica tu conexión e inténtalo de nuevo.', 'error');
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Confirmar Reserva</span>';
    loading.style.display = 'none';
  });
});

// Mostrar mensajes
function showMessage(message, type) {
  const statusMessage = document.getElementById('statusMessage');
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
  statusMessage.style.display = 'block';
  
  // Auto ocultar después de 5 segundos
  setTimeout(() => {
    statusMessage.style.display = 'none';
  }, 5000);
  
  // Vibración en móviles si está disponible
  if (navigator.vibrate && type === 'error') {
    navigator.vibrate([100, 100, 100]);
  }
}

// Formatear fecha
function formatearFecha(fecha) {
  if (!fecha) return 'Sin fecha';
  
  try {
    let fechaObj;
    
    if (fecha instanceof Date) {
      fechaObj = fecha;
    } else {
      const fechaStr = fecha.toString();
      
      if (fechaStr.includes('/')) {
        const partes = fechaStr.split('/');
        fechaObj = new Date(parseInt(partes[2]), parseInt(partes[1]) - 1, parseInt(partes[0]));
      } else if (fechaStr.includes('-')) {
        fechaObj = new Date(fechaStr);
      } else {
        fechaObj = new Date(fechaStr);
      }
    }
    
    if (!isNaN(fechaObj.getTime())) {
      return fechaObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  } catch (error) {
    console.log('❌ Error al formatear fecha:', error);
  }
  
  return fecha.toString();
}

// Formatear hora
function formatearHora(hora) {
  if (!hora || hora.length === 0) return 'Sin hora';
  
  try {
    if (hora instanceof Date) {
      return hora.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
    
    const horaStr = hora.toString();
    
    if (horaStr.includes('T')) {
      const date = new Date(horaStr);
      return date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }
    
    if (horaStr.includes(':')) {
      return horaStr.substring(0, 5);
    }
  } catch (error) {
    console.log('❌ Error al formatear hora:', error);
  }
  
  return hora.toString();
}

// Validar reserva
function esReservaValida(reserva) {
  if (!reserva || !reserva.nombre || !reserva.asignatura) return false;
  
  const nombre = reserva.nombre.toString().toLowerCase();
  const asignatura = reserva.asignatura.toString().toLowerCase();
  
  return !(nombre.includes('nombre') || 
           nombre.includes('docente') ||
           asignatura.includes('asignatura') ||
           nombre.trim().length === 0 ||
           asignatura.trim().length === 0);
}

// Cargar reservas existentes
function cargarReservasExistentes() {
  const lista = document.getElementById('listaReservas');
  
  // Mostrar loading
  lista.innerHTML = `
    <li class="placeholder">
      <span class="placeholder-icon">⏳</span>
      <div>Cargando reservas existentes...</div>
    </li>
  `;

  console.log('📥 Cargando reservas existentes...');
  
  fetch(SCRIPT_URL + '?action=getReservas&t=' + Date.now(), {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log('📡 Respuesta recibida:', response.status);
    if (!response.ok) {
      throw new Error('Error en la respuesta: ' + response.status);
    }
    return response.json();
  })
  .then(reservas => {
    console.log('📋 Reservas recibidas:', reservas);
    
    lista.innerHTML = '';
    
    if (Array.isArray(reservas) && reservas.length > 0) {
      const reservasValidas = reservas.filter(esReservaValida);
      
      console.log('✅ Reservas válidas filtradas:', reservasValidas.length);
      
      if (reservasValidas.length > 0) {
        reservasValidas.reverse().forEach(reserva => {
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
                <span class="detail-icon">📅</span>
                <span class="detail-text">${formatearFecha(reserva.fecha)}</span>
              </div>
              
              <div class="detail-item">
                <span class="detail-icon">🕐</span>
                <span class="detail-text">${formatearHora(reserva.retiro)} - ${formatearHora(reserva.entrega)}</span>
              </div>
            </div>
            
            <div class="reserva-recursos">
              <span class="recurso-tag ${reserva.proyector === 'Sí' ? 'activo' : 'inactivo'}">
                📽️ Proyector
              </span>
              <span class="recurso-tag ${reserva.pizarra === 'Sí' ? 'activo' : 'inactivo'}">
                📺 Pizarra
              </span>
            </div>
            
            ${reserva.timestamp ? `<div class="reserva-timestamp">📝 Registrado: ${reserva.timestamp}</div>` : ''}
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
    console.error('❌ Error al cargar reservas:', error);
    
    lista.innerHTML = `
      <li class="placeholder error">
        <span class="placeholder-icon">⚠️</span>
        <div>
          <strong>No se pudieron cargar las reservas existentes</strong><br>
          <small>Las nuevas reservas aparecerán aquí después de enviarlas</small>
        </div>
      </li>
    `;
  });
}

// Mostrar mensaje sin reservas
function mostrarMensajeSinReservas() {
  const lista = document.getElementById('listaReservas');
  lista.innerHTML = `
    <li class="placeholder">
      <span class="placeholder-icon">📋</span>
      <div>
        <strong>No hay reservas registradas aún</strong><br>
        <small>Las reservas aparecerán aquí una vez que se envíen</small>
      </div>
    </li>
  `;
}

// Recargar reservas
function recargarReservas() {
  console.log('🔄 Recargando reservas manualmente...');
  
  // Feedback visual
  const btn = document.querySelector('.btn-refresh');
  const originalContent = btn.innerHTML;
  btn.innerHTML = '<span>⏳</span><span>Cargando...</span>';
  btn.disabled = true;
  
  cargarReservasExistentes();
  
  // Restaurar botón después de 2 segundos
  setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.disabled = false;
  }, 2000);
}

// Prevenir zoom en inputs en iOS
document.addEventListener('touchstart', function() {}, true);

// Optimizaciones para PWA (futuro)
if ('serviceWorker' in navigator) {
  console.log('🔧 Service Worker disponible para futuras mejoras');
}