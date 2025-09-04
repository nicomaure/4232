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

  fetch('https://script.google.com/macros/s/AKfycbxPCDUDuO0I3XsanyjMeIlOD8sdF9GFB9Nif2RmYkuENFSw6A9tKvOG75Jeya7oSdfgiQ/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Error en la solicitud: ' + res.status);
    }
    return res.json();
  })
  .then(response => {
    if (response.success) {
      alert('Reserva guardada con éxito');
      document.getElementById('reservaForm').reset();
    } else {
      alert('Hubo un problema al guardar la reserva.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Hubo un problema al guardar la reserva. Por favor, inténtalo de nuevo.');
  });
});
