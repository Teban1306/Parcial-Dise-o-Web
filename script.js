// Variables globales para el mapa y los conglomerados
let mapGlobal = null;

//script para confirmar el correo
// Espera a que cargue el DOM antes de ejecutar
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que el formulario recargue la página

    // Obtiene valores del formulario
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validación de usuarios
    if (email === "isabel@ideam.com" && password === "isabel123") {
      // Redirige a la vista de Científico
      window.location.href = "vistaCientifico.html";
    } else if (email === "cris@ideam.com" && password === "cris123") {
      // Redirige a la vista de Coordinador
      window.location.href = "vistaCoordinador.html";
    } else {
      // Credenciales incorrectas
      alert("Correo o contraseña incorrectos");
    }
  });
});


function inicializarMapa() {
    const mapaElement = document.getElementById('mapa-satelital');
    if (!mapaElement) {
        console.error('Elemento mapa-satelital no encontrado');
        return;
    }
    
    // Crear mapa centrado en Colombia
    mapGlobal = L.map('mapa-satelital').setView([4.5709, -74.2973], 6);
    
    // OPCIÓN 1: Esri World Imagery (Satelital - MÁS CONFIABLE)
    var esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri',
        maxZoom: 19
    });
    
    // OPCIÓN 2: USGS (Satélite de EE.UU. - muy buena calidad)
    var usgsSat = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'USGS',
        maxZoom: 16
    });
    
    // OPCIÓN 3: OpenTopoMap (combinación topo + satélite)
    var openTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: © OpenStreetMap, SRTM | Map style: © OpenTopoMap',
        maxZoom: 17
    });
    
    // OPCIÓN 4: Google Satellite (requiere más cuidado pero funciona)
    var googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        attribution: '© Google',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    
    // OPCIÓN 5: Google Hybrid (satélite + etiquetas)
    var googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '© Google',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    
    // Añadir capa por defecto (Google Hybrid es excelente para trabajo forestal)
    googleHybrid.addTo(mapGlobal);
    
    var baseMaps = {
        "Satélite + Etiquetas": googleHybrid,
        "Satélite Google": googleSat,
        "Satélite Esri": esriSat,
        "Topográfico": openTopo
    };
    
    L.control.layers(baseMaps).addTo(mapGlobal);
    
    // Invalidar tamaño para asegurar carga correcta
    setTimeout(function() {
        mapGlobal.invalidateSize();
    }, 400);
    
    // Conglomerados
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

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const brigadaForm = document.getElementById('brigadaForm');
    const toggleText = document.getElementById('toggleText');
    
    if (brigadaForm && toggleText) {
        brigadaForm.addEventListener('show.bs.collapse', function() {
            toggleText.textContent = 'Cancelar';
            // Invalida el tamaño del mapa cuando se abre el formulario
            if (mapGlobal) {
                setTimeout(function() {
                    mapGlobal.invalidateSize();
                }, 300);
            }
        });
        
        brigadaForm.addEventListener('hide.bs.collapse', function() {
            toggleText.textContent = 'Agregar nuevo conglomerado';
            // Invalidar tamaño cuando se cierra el formulario
            if (mapGlobal) {
                setTimeout(function() {
                    mapGlobal.invalidateSize();
                }, 300);
            }
        });
    }
    
    // Inicializar el mapa con delay mayor
    setTimeout(inicializarMapa, 300);
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
// coordinador dani
// /Brigadista
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('crearBrigadistaForm');
  if (!form) return console.warn('crearBrigadistaForm no encontrado');

  const tipoDocInput = document.getElementById('tipoDoc');
  const numDocInput = document.getElementById('numDoc');
  const nombresInput = document.getElementById('nombres');
  const apellidosInput = document.getElementById('apellidos');
  const rolSelect = document.getElementById('rol');
  const contactoInput = document.getElementById('contacto');
  const messageDiv = document.getElementById('brigadistaMessage');

  // Validación de patrones
  const patterns = {
    numDoc: /^\d+$/,
    nombres: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    apellidos: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    contacto: /^(\d{7,15}|\S+@\S+\.\S+)$/
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageDiv.innerHTML = '';

    const tipoDocVal = (tipoDocInput.value || '').trim();
    const numDocVal = (numDocInput.value || '').trim();
    const nombresVal = (nombresInput.value || '').trim();
    const apellidosVal = (apellidosInput.value || '').trim();
    const rolVal = (rolSelect.value || '').trim();
    const contactoVal = (contactoInput.value || '').trim();

    // Validaciones
    if (!tipoDocVal || !numDocVal || !nombresVal || !apellidosVal || !rolVal || !contactoVal) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Complete todos los campos.</div>';
      return;
    }

    if (!patterns.numDoc.test(numDocVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Número de documento inválido.</div>';
      return;
    }

    if (!patterns.nombres.test(nombresVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Nombres inválidos.</div>';
      return;
    }

    if (!patterns.apellidos.test(apellidosVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Apellidos inválidos.</div>';
      return;
    }

    if (!patterns.contacto.test(contactoVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Contacto inválido (teléfono o email).</div>';
      return;
    }

    if (!window.confirm('¿Está seguro de guardar el brigadista?')) return;

    const brigadista = {
      tipoDoc: tipoDocVal,
      numDoc: numDocVal,
      nombres: nombresVal,
      apellidos: apellidosVal,
      rol: rolVal,
      contacto: contactoVal,
      creadoEn: new Date().toISOString()
    };

    // Guardar en localStorage
    const stored = JSON.parse(localStorage.getItem('brigadistas') || '[]');
    stored.push(brigadista);
    localStorage.setItem('brigadistas', JSON.stringify(stored));

    messageDiv.innerHTML = '<div class="alert alert-success">✅ Brigadista guardado correctamente.</div>';
    form.reset();

    // Colapsar formulario
    const collapseEl = document.getElementById('brigadistaForm');
    if (typeof bootstrap !== 'undefined' && collapseEl) {
      const bs = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
      bs.hide();
    }
  });
});


//Brigada
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('crearBrigadaForm');
  if (!form) return console.warn('crearBrigadaForm no encontrado');

  const idInput = document.getElementById('idBrigada');
  const genBtn = document.getElementById('generateIdBtn');
  const liderSelect = document.getElementById('lider'); 
  const participantesContainer = document.getElementById('participantes-container');
  const conglomeradoSelect = document.getElementById('conglomerado');
  const descripcionInput = document.getElementById('descripcion');
  const objetivoInput = document.getElementById('objetivo');
  const messageDiv = document.getElementById('brigadaMessage');

  // crea una fila de participante
  function createParticipantRow() {
    const row = document.createElement('div');
    row.className = 'participante-row d-flex gap-2 mb-2 align-items-start';
    row.innerHTML = `
      <select class="form-select participante-select" name="participantes[]">
        <option value="">Selecciona persona</option>
        <option value="invest1">Investigador 1</option>
        <option value="invest2">Investigador 2</option>
        <option value="invest3">Investigador 3</option>
      </select>
      <select class="form-select rol-select" name="roles[]">
        <option value="">Selecciona rol</option>
        <option value="tecnico">Técnico auxiliar</option>
        <option value="botanico">Botánico</option>
        <option value="coinvestigador">Coinvestigador</option>
      </select>
      <button type="button" class="btn btn-success btn-sm add-participante">+</button>
      <button type="button" class="btn btn-danger btn-sm remove-participante">-</button>
    `;
    return row;
  }

  function initParticipants() {
    if (!participantesContainer.querySelector('.participante-row')) {
      participantesContainer.appendChild(createParticipantRow());
    }
  }

  // Generar ID
  genBtn.addEventListener('click', () => {
    idInput.value = 'BRG-' + (Math.floor(1000 + Math.random() * 9000));
    messageDiv.innerHTML = '';
  });

  // botones + y -
  participantesContainer.addEventListener('click', (ev) => {
    const t = ev.target;
    if (t.classList.contains('add-participante')) {
      participantesContainer.appendChild(createParticipantRow());
      return;
    }
    if (t.classList.contains('remove-participante')) {
      const row = t.closest('.participante-row');
      const rows = participantesContainer.querySelectorAll('.participante-row');
      if (rows.length > 1) row.remove();
      else {
        row.querySelector('.participante-select').value = '';
        row.querySelector('.rol-select').value = '';
      }
      form.reset();
    }
  });

  // Guardar brigada con validación
  fm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageDiv.innerHTML = '';

    const idVal = (idInput.value || '').trim();
    const liderVal = (liderSelect.value || '').trim();
    const conglomeradoVal = (conglomeradoSelect.value || '').trim();
    const descVal = (descripcionInput.value || '').trim();
    const objVal = (objetivoInput.value || '').trim();

    if (!idVal || !liderVal || !conglomeradoVal || !descVal || !objVal) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Complete ID, líder, conglomerado, descripción y objetivo.</div>';
      return;
    }

    const partRows = participantesContainer.querySelectorAll('.participante-row');
    if (partRows.length === 0) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Agregue al menos un participante.</div>';
      return;
    }

    for (const r of partRows) {
      const persona = (r.querySelector('.participante-select').value || '').trim();
      const rol = (r.querySelector('.rol-select').value || '').trim();
      if (!persona || !rol) {
        messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Cada participante necesita persona y rol.</div>';
        return;
      }
    }

    if (!window.confirm('¿Está seguro de guardar la brigada?')) return;

    const brigada = {
      id: idVal,
      lider: liderVal,
      conglomerado: conglomeradoVal,
      descripcion: descVal,
      objetivo: objVal,
      participantes: Array.from(partRows).map(r => ({
        persona: r.querySelector('.participante-select').value,
        rol: r.querySelector('.rol-select').value
      })),
      creadoEn: new Date().toISOString()
    };

    const stored = JSON.parse(localStorage.getItem('brigadas') || '[]');
    stored.push(brigada);
    localStorage.setItem('brigadas', JSON.stringify(stored));

    messageDiv.innerHTML = '<div class="alert alert-success">✅ Brigada guardada correctamente.</div>';
    form.reset();
    participantesContainer.innerHTML = '';
    participantesContainer.appendChild(createParticipantRow());
    idInput.value = '';

    const collapseEl = document.getElementById('brigadaForm');
    if (typeof bootstrap !== 'undefined' && collapseEl) {
      const bs = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
      bs.hide();
    }
  });

  initParticipants();
});document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('crearBrigadaForm');
  if (!form) return console.warn('crearBrigadaForm no encontrado');

  const idInput = document.getElementById('idBrigada');
  const liderSelect = document.getElementById('lider'); 
  const participantesContainer = document.getElementById('participantes-container');
  const conglomeradoSelect = document.getElementById('conglomerado');
  const descripcionInput = document.getElementById('descripcion');
  const objetivoInput = document.getElementById('objetivo');
  const messageDiv = document.getElementById('brigadaMessage');
  const collapseEl = document.getElementById('brigadaForm');

  // Generar ID automáticamente al abrir el formulario
  if (typeof bootstrap !== 'undefined' && collapseEl) {
    collapseEl.addEventListener('show.bs.collapse', () => {
      idInput.value = 'BRG-' + (Math.floor(1000 + Math.random() * 9000));
      messageDiv.innerHTML = '';
    });
  }

  // Crea una fila de participante
  function createParticipantRow() {
    const row = document.createElement('div');
    row.className = 'participante-row d-flex gap-2 mb-2 align-items-start';
    row.innerHTML = `
      <select class="form-select participante-select" name="participantes[]">
        <option value="">Selecciona persona</option>
        <option value="invest1">Investigador 1</option>
        <option value="invest2">Investigador 2</option>
        <option value="invest3">Investigador 3</option>
      </select>
      <select class="form-select rol-select" name="roles[]">
        <option value="">Selecciona rol</option>
        <option value="tecnico">Técnico auxiliar</option>
        <option value="botanico">Botánico</option>
        <option value="coinvestigador">Coinvestigador</option>
      </select>
      <button type="button" class="btn btn-success btn-sm add-participante">+</button>
      <button type="button" class="btn btn-danger btn-sm remove-participante">-</button>
    `;
    return row;
  }

  function initParticipants() {
    if (!participantesContainer.querySelector('.participante-row')) {
      participantesContainer.appendChild(createParticipantRow());
    }
  }

  // Botones + y -
  participantesContainer.addEventListener('click', (ev) => {
    const t = ev.target;
    if (t.classList.contains('add-participante')) {
      participantesContainer.appendChild(createParticipantRow());
      return;
    }
    if (t.classList.contains('remove-participante')) {
      const row = t.closest('.participante-row');
      const rows = participantesContainer.querySelectorAll('.participante-row');
      if (rows.length > 1) row.remove();
      else {
        row.querySelector('.participante-select').value = '';
        row.querySelector('.rol-select').value = '';
      }
    }
  });

  // Guardar brigada con validación
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    messageDiv.innerHTML = '';

    const idVal = (idInput.value || '').trim();
    const liderVal = (liderSelect.value || '').trim();
    const conglomeradoVal = (conglomeradoSelect.value || '').trim();
    const descVal = (descripcionInput.value || '').trim();
    const objVal = (objetivoInput.value || '').trim();

    if (!idVal || !liderVal || !conglomeradoVal || !descVal || !objVal) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Complete ID, líder, conglomerado, descripción y objetivo.</div>';
      return;
    }

    const partRows = participantesContainer.querySelectorAll('.participante-row');
    if (partRows.length === 0) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Agregue al menos un participante.</div>';
      return;
    }

    for (const r of partRows) {
      const persona = (r.querySelector('.participante-select').value || '').trim();
      const rol = (r.querySelector('.rol-select').value || '').trim();
      if (!persona || !rol) {
        messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Cada participante necesita persona y rol.</div>';
        return;
      }
    }

    if (!window.confirm('¿Está seguro de guardar la brigada?')) return;

    const brigada = {
      id: idVal,
      lider: liderVal,
      conglomerado: conglomeradoVal,
      descripcion: descVal,
      objetivo: objVal,
      participantes: Array.from(partRows).map(r => ({
        persona: r.querySelector('.participante-select').value,
        rol: r.querySelector('.rol-select').value
      })),
      creadoEn: new Date().toISOString()
    };

    const stored = JSON.parse(localStorage.getItem('brigadas') || '[]');
    stored.push(brigada);
    localStorage.setItem('brigadas', JSON.stringify(stored));

    messageDiv.innerHTML = '<div class="alert alert-success">✅ Brigada guardada correctamente.</div>';
    form.reset();
    messageDiv.innerHTML = ''; // <-- limpia mensaje
    participantesContainer.innerHTML = '';
    participantesContainer.appendChild(createParticipantRow());

    if (typeof bootstrap !== 'undefined' && collapseEl) {
      const bs = bootstrap.Collapse.getInstance(collapseEl) || new bootstrap.Collapse(collapseEl, { toggle: false });
      bs.hide();
    }
  });

  initParticipants();
});





// Genera coordenadas SOLO dentro de Colombia continental (rectángulo seguro sin mar)
function randomEnRangoColombia() {
    // Latitud: 1.5 (sur) a 11.2 (norte)
    // Longitud: -76.9 (oeste) a -69.0 (este)
    const lat = (Math.random() * (11.2 - 1.5) + 1.5).toFixed(6);
    const lon = (Math.random() * (-69.0 + 76.9) - 76.9).toFixed(6);
    return { lat, lon };
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

            // Generar coordenadas dentro del rectángulo seguro de Colombia
            const coords = randomEnRangoColombia();
            inputLat.value = coords.lat;
            inputLon.value = coords.lon;

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

// Datos de ejemplo para los reportes
const reportesEjemplo = {
    bractivas: [
        { id: 'B001', titulo: 'Brigada de recoleccion', descripcion: 'Brigada de recolección de datos en campo.' },
        { id: 'B002', titulo: 'Brigada de investigacion', descripcion: 'Brigada de investigación de especies vegetales.' }
    ],
    brregistradas: [
        { id: 'B002', titulo: 'Brigada de investigacion', descripcion: 'Brigada de investigación de especies vegetales.' }
    ],
    conregistrados: [
        { id: 'CG-001', titulo: 'Conglomerado Generado', descripcion: 'Conglomerado generado mediante software. ' },
        { id: 'CG-002', titulo: 'Conglomerado Generado', descripcion: 'Conglomerado generado mediante software. ' },
        { id: 'CG-003', titulo: 'Conglomerado Generado', descripcion: 'Conglomerado generado mediante software. ' }
    ]
};

// Función para renderizar los reportes según el filtro
function renderizarReportes(tipo) {
    const contenedor = document.getElementById('contenedorReportes');
    contenedor.innerHTML = '';
    const reportes = reportesEjemplo[tipo] || [];
    if (reportes.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No hay reportes para este filtro.</p>';
        return;
    }
    reportes.forEach(rep => {
        const card = document.createElement('div');
        card.className = 'alert alert-secondary mb-3';
        card.innerHTML = `<strong>${rep.titulo}</strong><br><small>ID: ${rep.id}</small><br>${rep.descripcion}`;
        contenedor.appendChild(card);
    });
}

// Evento para el filtro de reportes
document.addEventListener('DOMContentLoaded', function() {
    const filtro = document.getElementById('filtroReporte');
    if (filtro) {
        renderizarReportes(filtro.value); // Mostrar el filtro inicial
        filtro.addEventListener('change', function() {
            renderizarReportes(this.value);
        });
    }
});
