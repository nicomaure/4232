// ===============================
// CONFIGURACIÓN
// ===============================
// Esta es la URL por defecto, pero se puede cambiar desde la interfaz
let API_URL = localStorage.getItem('apiUrl') || 'https://script.google.com/macros/s/AKfycbyOIgwj-pN7qmmkqkZjJtUc45J7uotxnIOSpQTSzhDVxA54iJUuHGIRZPa-vsENBza-3g/exec';

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
  const saveApiUrlBtn = document.getElementById("saveApiUrl");
  const urlStatus = document.getElementById("urlStatus");

  // Establecer fecha mínima como hoy
  const fechaInput = document.getElementById("fecha");
  const today = new Date().toISOString().split('T')[0];
  fechaInput.setAttribute('min', today);

  // Cargar URL guardada si existe
  if (localStorage.getItem('apiUrl')) {
    apiUrlInput.value = localStorage.getItem('apiUrl');
    API_URL = localStorage.getItem('apiUrl');
  }

  // Guardar nueva URL
  saveApiUrlBtn.addEventListener('click', () => {
    const newUrl = apiUrlInput.value.trim();
    if (newUrl) {
      localStorage.setItem('apiUrl', newUrl);
      API_URL = newUrl;
      mostrarMensajeURL("✅ URL guardada correctamente", "success");
      testConnection();
      recargarReservas();
    } else {
      mostrarMensajeURL("❌ Por favor ingresa una URL válida", "error");
    }
  });

  // Probar conexión al cargar la página
  testConnection();

  // Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

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
      nombre: document.getElementById("nombre").value.trim(),
      asignatura: document.getElementById("asignatura").value.trim(),
      fecha: document.getElementById("fecha").value,
      retiro: document.getElementById("retiro").value,
      entrega: document.getElementById("entrega").value,
      proyector: document.getElementById("proyector").checked ? "Sí" : "No",
      pizarra: document.getElementById("pizarra").checked ? "Sí" : "No",
    };

    console.log("Enviando reserva:", reserva);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });

      // Google Apps Script devuelve respuestas HTML incluso cuando se solicita JSON
      // Necesitamos manejar esto de manera especial
      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Error parsing JSON:", e, "Response:", responseText);
        throw new Error("Formato de respuesta inválido del servidor");
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
      mostrarMensaje("❌ Error de conexión: " + err.message, "error");
    }
  });

  // Cargar reservas al inicio
  recargarReservas();

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

  // Función para mostrar mensajes de URL
  function mostrarMensajeURL(msg, type) {
    urlStatus.textContent = msg;
    urlStatus.className = "status-message " + type;
    urlStatus.style.display = "block";
    
    setTimeout(() => {
      urlStatus.style.display = "none";
    }, 3000);
  }

  // Función para probar conexión con la API
  async function testConnection() {
    try {
      connectionStatus.textContent = "Comprobando conexión...";
      connectionStatus.className = "connection-status checking";
      
      const response = await fetch(API_URL);
      const text = await response.text();
      
      // Intentar parsear como JSON, pero no es crítico si falla
      try {
        const data = JSON.parse(text);
        connectionStatus.textContent = "✅ Conectado al servidor";
        connectionStatus.className = "connection-status connected";
      } catch (e) {
        // Si no es JSON válido, pero la respuesta existe, asumimos que está conectado
        connectionStatus.textContent = "✅ Conectado al servidor";
        connectionStatus.className = "connection-status connected";
      }
    } catch (err) {
      console.error("Error de conexión:", err);
      connectionStatus.textContent = "❌ Error de conexión con el servidor";
      connectionStatus.className = "connection-status error";
    }
  }

  // Función pública para refrescar reservas
  window.recargarReservas = async function () {
    listaReservas.innerHTML = `
      <li class="placeholder">
        <span class="placeholder-icon">⏳</span>
        <div>Cargando reservas existentes...</div>
      </li>`;

    try {
      const response = await fetch(API_URL);
      const text = await response.text();
      let reservas;
      
      try {
        reservas = JSON.parse(text);
      } catch (e) {
        console.error("Error parsing reservations:", e, "Response:", text);
        throw new Error("Formato de respuesta inválido del servidor");
      }

      if (!reservas || reservas.length === 0) {
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