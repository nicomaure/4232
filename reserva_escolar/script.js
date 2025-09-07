// ===============================
// CONFIGURACIÓN
// ===============================
let API_URL = localStorage.getItem('apiUrl') || 'https://script.google.com/macros/s/AKfycbxkGUgKAZGflgn9epL1ZUg6GMwYdTmt-QHb4E12pxTq6N0pkKxClzFfkxxHWr9XFS-8/exec';
let SHEET_ID = localStorage.getItem('sheetId') || '1-qbKXCYLEUZ9E-qOclKLLj81EZ4-hmVxXI0KGMvqHQM';

// ===============================
// MANEJO DEL FORMULARIO
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("reservaForm");
  const loading = document.getElementById("loading");
  const statusMessage = document.getElementById("statusMessage");
  const listaReservas = document.getElementById("listaReservas");
  const connectionStatus = document.getElementById("connectionStatus");
  const apiUrlInput = document.getElementById("apiUrl");
  const sheetIdInput = document.getElementById("sheetId");
  const saveConfigBtn = document.getElementById("saveConfig");
  const configStatus = document.getElementById("configStatus");
  const testConnectionLink = document.getElementById("testConnection");

  // Cargar configuración guardada
  if (localStorage.getItem('apiUrl')) {
    apiUrlInput.value = localStorage.getItem('apiUrl');
    API_URL = localStorage.getItem('apiUrl');
  }
  
  if (localStorage.getItem('sheetId')) {
    sheetIdInput.value = localStorage.getItem('sheetId');
    SHEET_ID = localStorage.getItem('sheetId');
  }

  // Guardar nueva configuración
  saveConfigBtn.addEventListener('click', () => {
    const newUrl = apiUrlInput.value.trim();
    const newSheetId = sheetIdInput.value.trim();
    
    if (newUrl && newSheetId) {
      localStorage.setItem('apiUrl', newUrl);
      localStorage.setItem('sheetId', newSheetId);
      API_URL = newUrl;
      SHEET_ID = newSheetId;
      mostrarMensajeConfig("✅ Configuración guardada correctamente", "success");
      testConnection();
      recargarReservas();
    } else {
      mostrarMensajeConfig("❌ Por favor completa ambos campos", "error");
    }
  });

  // Probar conexión al cargar la página
  if (API_URL && SHEET_ID) {
    testConnection();
  } else {
    connectionStatus.textContent = "⚠️ Configura la URL y el ID de la hoja de cálculo";
    connectionStatus.className = "connection-status error";
  }

  // Enlace para probar conexión
  testConnectionLink.addEventListener('click', (e) => {
    e.preventDefault();
    testConnection();
  });

  // Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!API_URL || !SHEET_ID) {
      mostrarMensaje("❌ Configura primero la URL y el ID de la hoja de cálculo", "error");
      return;
    }

    // Validar que la hora de entrega sea posterior a la de retiro
    const retiro = document.getElementById("retiro").value;
    const entrega = document.getElementById("entrega").value;
    
    if (retiro >= entrega) {
      mostrarMensaje("❌ La hora de entrega debe ser posterior a la hora de retiro", "error");
      return;
    }

    // Mostrar cargando
    loading.style.display = "block";
    statusMessage.style.display = "none";
    document.getElementById("submitBtn").disabled = true;

    // Construir objeto de reserva
    const reserva = {
      action: "create", // Agregar acción explícita
      nombre: document.getElementById("nombre").value.trim(),
      asignatura: document.getElementById("asignatura").value.trim(),
      fecha: document.getElementById("fecha").value,
      retiro: document.getElementById("retiro").value,
      entrega: document.getElementById("entrega").value,
      proyector: document.getElementById("proyector").checked ? "Sí" : "No",
      pizarra: document.getElementById("pizarra").checked ? "Sí" : "No",
      sheetId: SHEET_ID
    };

    console.log("Enviando reserva:", reserva);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Cambiado a application/json
        },
        body: JSON.stringify(reserva),
      });

      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);
      
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Error parsing JSON:", e, "Response:", responseText);
        // Si no es JSON, intentar extraer información útil del HTML de error
        if (responseText.includes("Authorization required") || responseText.includes("sign in")) {
          throw new Error("Error de autorización: La aplicación web no tiene permisos públicos");
        } else if (responseText.includes("Script function not found")) {
          throw new Error("Función no encontrada en el script");
        } else {
          throw new Error("Respuesta inválida del servidor. Verifica la configuración del Apps Script");
        }
      }

      loading.style.display = "none";
      document.getElementById("submitBtn").disabled = false;

      if (data.status === "success") {
        mostrarMensaje("✅ Reserva realizada con éxito", "success");
        form.reset();
        recargarReservas();
      } else if (data.status === "conflict") {
        mostrarMensaje("⚠️ " + data.message, "error");
      } else {
        mostrarMensaje("❌ Error: " + (data.message || "Error desconocido"), "error");
      }
    } catch (err) {
      console.error("❌ Error de conexión:", err);
      loading.style.display = "none";
      document.getElementById("submitBtn").disabled = false;
      mostrarMensaje("❌ " + err.message, "error");
    }
  });

  // Cargar reservas al inicio si hay configuración
  if (API_URL && SHEET_ID) {
    recargarReservas();
  }

  // Función para mostrar mensajes
  function mostrarMensaje(msg, type) {
    statusMessage.textContent = msg;
    statusMessage.className = "status-message " + type;
    statusMessage.style.display = "block";
    
    // Auto-ocultar mensajes después de 5 segundos
    if (type === "success") {
      setTimeout(() => {
        statusMessage.style.display = "none";
      }, 5000);
    }
  }

  // Función para mostrar mensajes de configuración
  function mostrarMensajeConfig(msg, type) {
    configStatus.textContent = msg;
    configStatus.className = "status-message " + type;
    configStatus.style.display = "block";
    
    setTimeout(() => {
      configStatus.style.display = "none";
    }, 3000);
  }

  // Función para recargar las reservas
  window.recargarReservas = async function() {
    if (!API_URL || !SHEET_ID) {
      console.error('Falta configurar la URL o el ID de la hoja');
      return;
    }

    const listaReservas = document.getElementById('listaReservas');
    if (!listaReservas) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get',
          sheetId: SHEET_ID
        })
      });

      const data = await response.json();
      
      if (data.status === 'success' && Array.isArray(data.data)) {
        listaReservas.innerHTML = '';
        
        if (data.data.length === 0) {
          listaReservas.innerHTML = '<li class="no-reservas">No hay reservas registradas</li>';
          return;
        }

        data.data.forEach(reserva => {
          const li = document.createElement('li');
          li.className = 'reserva-item';
          li.innerHTML = `
            <div class="reserva-header">
              <span class="reserva-fecha">${formatearFecha(reserva.fecha)}</span>
              <span class="reserva-horario">${reserva.retiro} - ${reserva.entrega}</span>
            </div>
            <div class="reserva-docente">👤 ${reserva.nombre}</div>
            <div class="reserva-asignatura">📚 ${reserva.asignatura}</div>
            <div class="reserva-recursos">
              ${reserva.proyector === 'Sí' ? '📽️ ' : ''}
              ${reserva.pizarra === 'Sí' ? '📺' : ''}
            </div>
          `;
          listaReservas.appendChild(li);
        });
      } else {
        listaReservas.innerHTML = '<li class="error">Error al cargar las reservas</li>';
      }
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      listaReservas.innerHTML = '<li class="error">Error de conexión al cargar reservas</li>';
    }
  };

  // Función para probar conexión con la API
  async function testConnection() {
    if (!API_URL || !SHEET_ID) {
      connectionStatus.textContent = "⚠️ Configura la URL y el ID de la hoja de cálculo";
      connectionStatus.className = "connection-status error";
      return;
    }
    
    try {
      connectionStatus.textContent = "Comprobando conexión...";
      connectionStatus.className = "connection-status checking";
      
      // Enviar una solicitud de prueba
      const testData = {
        action: "test",
        sheetId: SHEET_ID
      };
      
      console.log("Enviando prueba de conexión:", testData);
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(testData),
      });
      
      const text = await response.text();
      console.log("Respuesta de prueba:", text);
      
      try {
        const data = JSON.parse(text);
        if (data.status === "success" || data.status === "error") {
          connectionStatus.textContent = "✅ Conectado al servidor";
          connectionStatus.className = "connection-status connected";
        } else {
          connectionStatus.textContent = "⚠️ Respuesta inesperada del servidor";
          connectionStatus.className = "connection-status error";
        }
      } catch (e) {
        if (text.includes("Authorization required") || text.includes("sign in")) {
          connectionStatus.textContent = "❌ Error de autorización - Configura permisos públicos";
          connectionStatus.className = "connection-status error";
        } else {
          connectionStatus.textContent = "❌ Error en la respuesta del servidor";
          connectionStatus.className = "connection-status error";
        }
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      connectionStatus.textContent = "❌ Error de conexión con el servidor";
      connectionStatus.className = "connection-status error";
    }
  }

  // Función pública para refrescar reservas
  window.recargarReservas = async function () {
    if (!API_URL || !SHEET_ID) {
      listaReservas.innerHTML = `
        <li class="placeholder">
          <span class="placeholder-icon">⚙️</span>
          <div>Configura la URL y el ID de la hoja de cálculo para ver las reservas</div>
        </li>`;
      return;
    }

    listaReservas.innerHTML = `
      <li class="placeholder">
        <span class="placeholder-icon">⏳</span>
        <div>Cargando reservas existentes...</div>
      </li>`;

    try {
      // Enviar solicitud para obtener reservas
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          action: "get",
          sheetId: SHEET_ID
        }),
      });
      
      const text = await response.text();
      console.log("Respuesta de reservas:", text);
      
      let reservas;
      
      try {
        reservas = JSON.parse(text);
      } catch (e) {
        console.error("Error parsing reservas:", e, "Response:", text);
        throw new Error("Formato de respuesta inválido del servidor");
      }

      // Si la respuesta es un objeto con datos, extraer el array
      if (reservas && reservas.status === "success" && reservas.data) {
        reservas = reservas.data;
      }

      if (!Array.isArray(reservas) || reservas.length === 0) {
        listaReservas.innerHTML = `
          <li class="placeholder">
            <span class="placeholder-icon">📭</span>
            <div>No hay reservas registradas</div>
          </li>`;
        return;
      }

      listaReservas.innerHTML = "";
      
      // Ordenar reservas por fecha y hora (más recientes primero)
      reservas.sort((a, b) => {
        const dateA = new Date(a.fecha + "T" + a.retiro);
        const dateB = new Date(b.fecha + "T" + b.retiro);
        return dateB - dateA;
      });
      
      reservas.forEach((reserva) => {
        const li = document.createElement("li");
        li.className = "reserva-item";
        li.innerHTML = `
          <div class="reserva-docente">${reserva.nombre}</div>
          <div class="reserva-asignatura">${reserva.asignatura}</div>
          <div class="reserva-details">
            <div class="detail-item">📅 ${formatearFecha(reserva.fecha)}</div>
            <div class="detail-item">⏰ ${reserva.retiro} - ${reserva.entrega}</div>
            <div class="detail-item">
              <span class="recurso-tag ${reserva.proyector === "Sí" ? "activo" : "inactivo"}">Proyector</span>
              <span class="recurso-tag ${reserva.pizarra === "Sí" ? "activo" : "inactivo"}">Pizarra</span>
            </div>
          </div>
          <div class="reserva-timestamp">Registrado: ${reserva.timestamp || "Fecha no disponible"}</div>
        `;
        listaReservas.appendChild(li);
      });
    } catch (err) {
      console.error("❌ Error al cargar reservas:", err);
      listaReservas.innerHTML = `
        <li class="placeholder">
          <span class="placeholder-icon">⚠️</span>
          <div>Error al cargar reservas: ${err.message}</div>
        </li>`;
    }
  };
  
  // Función auxiliar para formatear fechas
  function formatearFecha(fechaStr) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const fecha = new Date(fechaStr + 'T00:00:00');
    return fecha.toLocaleDateString('es-AR', options);
  }
});