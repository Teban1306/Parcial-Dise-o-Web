
// Función para inicializar el mapa interactivo con Leaflet
function inicializarMapa() {
  // Verificar que el elemento con ID 'mapa-satelital' existe en el DOM
  const mapaElement = document.getElementById('mapa-satelital');
  if (!mapaElement) {
    // Mostrar error en consola si el elemento no se encuentra
    console.error('Elemento mapa-satelital no encontrado');
    return;
  }

  // Crear mapa centrado en Colombia (coordenadas: 4.5709, -74.2973) con zoom nivel 6
  var map = L.map('mapa-satelital').setView([4.5709, -74.2973], 6);

  // Definir capa de Google Satellite (imágenes satelitales de alta calidad)
  var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20, // Zoom máximo permitido
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'], // Subdominios para balanceo de carga
      attribution: '© Google' // Atribución 
  });

  // Definir capa alternativa de Esri World Imagery (gratuita)
  var esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics' // Atribución requerida
  });

  // Agregar la capa de Google Satellite al mapa por defecto
  googleSat.addTo(map);

  // Crear control de capas para alternar entre Google y Esri
  var baseMaps = {
      "Vista Satelital": googleSat,
      "Esri Satelital": esriSat
  };
  L.control.layers(baseMaps).addTo(map);

  // Definir arreglo de conglomerados con coordenadas, nombres e IDs (RF-008: consulta de conglomerados)
  var conglomerados = [
      {coords: [4.7110, -74.0721], nombre: "Conglomerado Bogotá", id: "CON-001"},
      {coords: [6.2442, -75.5812], nombre: "Conglomerado Medellín", id: "CON-002"},
      {coords: [10.4806, -75.5135], nombre: "Conglomerado Cartagena", id: "CON-003"},
      {coords: [3.4516, -76.5320], nombre: "Conglomerado Cali", id: "CON-004"}
  ];

  // Agrega marcadores al mapa
  conglomerados.forEach(function(punto) {
      // Crear marcador en las coordenadas del conglomerado
      var marker = L.marker(punto.coords).addTo(map);
      // Asignar un popup (Ventana emergente) con información del conglomerado y un botón
      marker.bindPopup(`
          <div class="text-center">
              <h6><strong>${punto.nombre}</strong></h6>
              <p>ID: ${punto.id}</p>
              <small>Área: 0.35 ha</small><br>
              <button class="btn btn-sm btn-success mt-1">Ver Detalles</button>
          </div>
      `);
  });
}

// Ejecutar cuando el DOM (Data object model) esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar elementos del formulario colapsable y texto del botón
  const brigadaForm = document.getElementById('brigadaForm');
  const toggleText = document.getElementById('toggleText');
  
  // Verificar que los elementos existen antes de añadir eventos
  if (brigadaForm && toggleText) {
    // Cambiar texto del botón a "Cancelar" cuando el formulario se muestra (RF-003)
    brigadaForm.addEventListener('show.bs.collapse', function() {
      toggleText.textContent = 'Cancelar';
    });
    
    // Cambiar texto del botón a "Crear nueva brigada" cuando el formulario se oculta
    brigadaForm.addEventListener('hide.bs.collapse', function() {
      toggleText.textContent = 'Crear nueva brigada';
    });
  }
  
  // Inicializar el mapa con un retraso de 100ms para asegurar que el DOM esté listo
  setTimeout(inicializarMapa, 100);
});

//daniela//
document.addEventListener('DOMContentLoaded', () => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');

    next.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        slide.appendChild(items[0]);
    });

    prev.addEventListener('click', () => {
        const items = document.querySelectorAll('.item');
        slide.prepend(items[items.length - 1]);
    });
});