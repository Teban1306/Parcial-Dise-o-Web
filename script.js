// Variables globales para el mapa y los conglomerados
let mapGlobal = null;

// Modifica la función para guardar el mapa en una variable global
function inicializarMapa() {
  const mapaElement = document.getElementById('mapa-satelital');
  if (!mapaElement) {
    console.error('Elemento mapa-satelital no encontrado');
    return;
  }

  // Crear mapa centrado en Colombia
  mapGlobal = L.map('mapa-satelital').setView([4.5709, -74.2973], 6);

  // Capas base
  var googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '© Google'
  });
  var esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics'
  });

  googleSat.addTo(mapGlobal);

  var baseMaps = {
      "Vista Satelital": googleSat,
      "Esri Satelital": esriSat
  };
  L.control.layers(baseMaps).addTo(mapGlobal);

  // Conglomerados iniciales
  var conglomerados = [];

  conglomerados.forEach(function(punto) {
      var marker = L.marker(punto.coords).addTo(mapGlobal);
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
    
    // Cambiar texto del botón a "Agregar nuevo conglomerado" cuando el formulario se oculta
    brigadaForm.addEventListener('hide.bs.collapse', function() {
      toggleText.textContent = 'Agregar nuevo conglomerado';
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
// !formulario conglomerado

let contadorConglomerado = 1;

// Función para generar un número aleatorio en un rango
function randomEnRango(min, max) {
    return (Math.random() * (max - min) + min).toFixed(6);
}

// Evento para el botón "Generar conglomerado"
document.addEventListener('DOMContentLoaded', function() {
    const btnGenerar = document.querySelector('button.btn.btn-primary.btn-lg.px-2.py-2');
    const inputId = document.getElementById('idconglomerado');
    const inputLat = document.getElementById('latitud');
    const inputLon = document.getElementById('longitud');

    if (btnGenerar && inputId && inputLat && inputLon) {
        btnGenerar.addEventListener('click', function() {
            // Generar ID incremental con formato CG-XXX
            inputId.value = `CG-${String(contadorConglomerado).padStart(3, '0')}`;
            contadorConglomerado++;

            // Generar latitud y longitud aleatorias
            inputLat.value = randomEnRango(-4.2, 13.4);
            inputLon.value = randomEnRango(-79.0, 66.8);

            // Agregar marcador al mapa si está inicializado
            if (mapGlobal) {
                const lat = parseFloat(inputLat.value);
                const lon = parseFloat(inputLon.value);
                const id = inputId.value;
                const marker = L.marker([lat, lon]).addTo(mapGlobal);
                marker.bindPopup(`
                    <div class="text-center">
                        <h6><strong>Nuevo Conglomerado</strong></h6>
                        <p>ID: ${id}</p>
                        <small>Coordenadas: ${lat}, ${lon}</small>
                    </div>
                `).openPopup();
                mapGlobal.setView([lat, lon], 10); // Centra el mapa en el nuevo marcador
            }
        });
    }
});

// Evento para el botón "Guardar Conglomerado"
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#brigadaForm form');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita el envío automático
            const confirmar = window.confirm('¿Estás seguro de guardar el conglomerado?');
            if (confirmar) {
                window.alert('¡Conglomerado guardado exitosamente!');
                // Aquí puedes agregar el código para cerrar el formulario si lo deseas
                // document.getElementById('brigadaForm').classList.remove('show');
                formulario.reset();
            }
            // Si el usuario cancela, simplemente no se hace nada y puede seguir editando
        });
    }
});