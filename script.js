
// Función para inicializar el mapa
function inicializarMapa() {
  // Verificar que el elemento del mapa existe
  const mapaElement = document.getElementById('mapa-satelital');
  if (!mapaElement) {
    console.error('Elemento mapa-satelital no encontrado');
    return;
  }

  // Inicializar mapa centrado en Colombia
  var map = L.map('mapa-satelital').setView([4.5709, -74.2973], 6);

  // OPCIÓN A: Google Satellite (Mejor calidad)
  var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '© Google'
  });

  // OPCIÓN B: Esri World Imagery (Alternativa gratuita)
  var esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics'
  });

  // Agregar la capa satelital al mapa
  googleSat.addTo(map);

  // Control de capas (opcional)
  var baseMaps = {
      "Vista Satelital": googleSat,
      "Esri Satelital": esriSat
  };
  L.control.layers(baseMaps).addTo(map);

  // Agregar marcadores de conglomerados
  var conglomerados = [
      {coords: [4.7110, -74.0721], nombre: "Conglomerado Bogotá", id: "CON-001"},
      {coords: [6.2442, -75.5812], nombre: "Conglomerado Medellín", id: "CON-002"},
      {coords: [10.4806, -75.5135], nombre: "Conglomerado Cartagena", id: "CON-003"},
      {coords: [3.4516, -76.5320], nombre: "Conglomerado Cali", id: "CON-004"}
  ];

  conglomerados.forEach(function(punto) {
      var marker = L.marker(punto.coords).addTo(map);
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

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar formulario
  const contactForm = document.getElementById('contactForm');
  const toggleText = document.getElementById('toggleText');
  
  if (contactForm && toggleText) {
    contactForm.addEventListener('show.bs.collapse', function() {
      toggleText.textContent = 'Cancelar';
    });
    
    contactForm.addEventListener('hide.bs.collapse', function() {
      toggleText.textContent = 'Crear nueva brigada';
    });
  }
  
  // Inicializar mapa con un pequeño retraso para asegurar que el DOM esté listo
  setTimeout(inicializarMapa, 100);
});