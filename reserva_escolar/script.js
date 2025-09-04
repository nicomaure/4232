
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const data = {
    nombre: document.getElementById('nombre').value,
    asignatura: document.getElementById('asignatura').value,
    fecha: document.getElementById('fecha').value,
    retiro: document.getElementById('retiro').value,
    entrega: document.getElementById('entrega').value,
    proyector: document.getElementById('proyector').checked ? 'Sí' : 'No',
    pizarra: document.getElementById('pizarra').checked ? 'Sí' : 'No'
  };

  fetch('https://script.google.com/macros/s/AKfycbylA55suEcT3JFVBbTuHUmUPBjSoCZdls1aXoedEGwyvsx11PFKoFjrG1nFPzhknTuJKg/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      alert('Reserva guardada con éxito');
      document.getElementById('reservaForm').reset();
    });
});
