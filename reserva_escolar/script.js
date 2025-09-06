// ===============================
// CONFIGURACIÓN
// ===============================
const API_URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiha-DGq5mYHsZZy890dD5fK-65a54Gz9iiX2a_cpRU42DD2ChKDiRNGMb8fyXT_opAVQ5psy2-NGMUZGJDLxS4dBi5va1nGbu9tdmklK-FMEGFx63vIzbH5B-E4usmH4bw9eQhZHFKPlx3jaLn_oZyUO-KDlrKoXmasTxAzYG3ZRXX3r09YPZdekRMlwfZSyR-VCq4IbO1Xo2MedCaEWlOEyBbqCjS759pj4y2U1fsUrWgNO_43tx1sxyEAiK4zeY-H7ZaTEBRigUoom3BQC2RFj1XX6GNhyW5XAei&lib=MK2zH-K6HboaHqgE6Tk2huZqi43K6K11s';

// ===============================
// MANEJO DEL FORMULARIO
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("reservaForm");
  const loading = document.getElementById("loading");
  const statusMessage = document.getElementById("statusMessage");
  const listaReservas = document.getElementById("listaReservas");

  // Envío del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Mostrar cargando
    loading.style.display = "block";
    statusMessage.style.display = "none";

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

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reserva),
      });

      const data = await response.json();
      loading.style.display = "none";

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
      mostrarMensaje("❌ No se pudo conectar al servidor", "error");
    }
  });

  // Cargar reservas al inicio
  recargarReservas();

  // Función para mostrar mensajes
  function mostrarMensaje(msg, type) {
    statusMessage.textContent = msg;
    statusMessage.className = "status-message " + type;
    statusMessage.style.display = "block";
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
      const reservas = await response.json();

      if (!reservas || reservas.length === 0) {
        listaReservas.innerHTML = `
          <li class="placeholder">
            <span class="placeholder-icon">📭</span>
            <div>No hay reservas registradas</div>
          </li>`;
        return;
      }

      listaReservas.innerHTML = "";
      reservas.forEach((reserva) => {
        const li = document.createElement("li");
        li.className = "reserva-item";
        li.innerHTML = `
          <div class="reserva-docente">${reserva.nombre}</div>
          <div class="reserva-asignatura">${reserva.asignatura}</div>
          <div class="reserva-details">
            <div class="detail-item">📅 ${reserva.fecha}</div>
            <div class="detail-item">⏰ ${reserva.retiro} - ${reserva.entrega}</div>
            <div class="detail-item">
              <span class="recurso-tag ${reserva.proyector === "Sí" ? "activo" : "inactivo"}">Proyector</span>
              <span class="recurso-tag ${reserva.pizarra === "Sí" ? "activo" : "inactivo"}">Pizarra</span>
            </div>
          </div>
          <div class="reserva-timestamp">Registrado: ${reserva.timestamp}</div>
        `;
        listaReservas.appendChild(li);
      });
    } catch (err) {
      console.error("❌ Error al cargar reservas:", err);
      listaReservas.innerHTML = `
        <li class="placeholder">
          <span class="placeholder-icon">⚠️</span>
          <div>Error al cargar reservas</div>
        </li>`;
    }
  };
});
