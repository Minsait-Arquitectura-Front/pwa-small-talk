// Registro del Service Worker para habilitar la funcionalidad de PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registrado con éxito:', registration);
    })
    .catch((error) => {
      console.log('Error al registrar el Service Worker:', error);
    });
}

// Función para pintar los datos de los pilotos en la página
function mostrarPilotos(pilotos) {
  const pilotosContainer = document.getElementById('pilotos-container');

  pilotos.forEach((piloto) => {
    const pilotoDiv = document.createElement('div');
    pilotoDiv.classList.add('piloto');
    pilotoDiv.innerHTML = `
      <img src="${piloto.image}" alt="${piloto.name} ${piloto.surname}">
      <h2>${piloto.name} ${piloto.surname}</h2>
      <p>Nacionalidad: ${piloto.nationality}</p>
      <p>Equipo: ${piloto.team}</p>
    `;
    pilotosContainer.appendChild(pilotoDiv);
  });
}

// Función para manejar el resultado del fetch y llamar a la función mostrarPilotos
function handleFetchResult(result) {
  if (!result.ok) {
    throw new Error('Error al recuperar los datos de los pilotos.');
  }
  return result.json();
}

// Función para manejar errores durante el fetch
function handleFetchError(error) {
  console.error('Error en la petición fetch:', error);
}

// Recuperar el JSON y llamar a las funciones correspondientes
fetch('/data/f1-drivers.json').then(handleFetchResult).then(mostrarPilotos).catch(handleFetchError);
