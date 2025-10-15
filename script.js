// ============================================
// VARIABLES GLOBALES
// ============================================
let mapGlobal = null;
let contadorConglomerado = 1;
let markerActual = null;

// ============================================
// AUTENTICACIÓN - LOGIN
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      // Validación de usuarios
      if (email === "isabel@ideam.com" && password === "isabel123") {
        window.location.href = "vistaCientifico.html";
      } else if (email === "cris@ideam.com" && password === "cris123") {
        window.location.href = "vistaCoordinador.html";
      } else {
        alert("Correo o contraseña incorrectos");
      }
    });
  }
});

// ============================================
// MAPA - INICIALIZACIÓN Y CONFIGURACIÓN
// ============================================
function inicializarMapa() {
    const mapaElement = document.getElementById('mapa-satelital');
    if (!mapaElement) {
        console.error('Elemento mapa-satelital no encontrado');
        return;
    }
    
    // Crear mapa centrado en Colombia
    mapGlobal = L.map('mapa-satelital').setView([4.5709, -74.2973], 6);
    
    // Capas de mapa disponibles
    var esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles © Esri',
        maxZoom: 19
    });
    
    var googleSat = L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        attribution: '© Google',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    
    var googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '© Google',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });
    
    var openTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: © OpenStreetMap, SRTM | Map style: © OpenTopoMap',
        maxZoom: 17
    });
    
    // Añadir capa por defecto
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
}

// Control de eventos del formulario colapsable del mapa
document.addEventListener('DOMContentLoaded', function() {
    const brigadaForm = document.getElementById('brigadaForm');
    const toggleText = document.getElementById('toggleText');
    
    if (brigadaForm && toggleText) {
        brigadaForm.addEventListener('show.bs.collapse', function() {
            toggleText.textContent = 'Cancelar';
            if (mapGlobal) {
                setTimeout(function() {
                    mapGlobal.invalidateSize();
                }, 300);
            }
        });
        
        brigadaForm.addEventListener('hide.bs.collapse', function() {
            toggleText.textContent = 'Agregar nuevo conglomerado';
            if (mapGlobal) {
                setTimeout(function() {
                    mapGlobal.invalidateSize();
                }, 300);
            }
        });
    }
    
    // Inicializar el mapa
    setTimeout(inicializarMapa, 300);
});

// ============================================
// CARRUSEL DE IMÁGENES (DANIELA)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const slide = document.querySelector('.slide');

    if (next && prev && slide) {
        next.addEventListener('click', () => {
            const items = document.querySelectorAll('.item');
            slide.appendChild(items[0]);
        });

        prev.addEventListener('click', () => {
            const items = document.querySelectorAll('.item');
            slide.prepend(items[items.length - 1]);
        });
    }
});

// ============================================
// UTILIDADES - GENERACIÓN DE COORDENADAS
// ============================================
// Genera coordenadas aleatorias dentro de Colombia continental
function randomEnRangoColombia() {
    // Latitud: 1.5 (sur) a 11.2 (norte)
    // Longitud: -76.9 (oeste) a -69.0 (este)
    const lat = (Math.random() * (11.2 - 1.5) + 1.5).toFixed(6);
    const lon = (Math.random() * (-69.0 + 76.9) - 76.9).toFixed(6);
    return { lat, lon };
}

// ============================================
// CONGLOMERADO - CREACIÓN Y GESTIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('crearConglomeradoForm');
    const btnGenerar = document.getElementById('btnGenerarConglomerado');
    const inputId = document.getElementById('idconglomerado');
    const inputLat = document.getElementById('latitud');
    const inputLon = document.getElementById('longitud');
    const nombreInput = document.getElementById('nombreBrigada');
    const descripcionInput = document.getElementById('descripcionBrigada');
    const messageDiv = document.getElementById('conglomeradoMessage');

    // Si no existe el formulario, salir
    if (!form) return;

    // Quitar errores cuando el usuario interactúe
    [nombreInput, descripcionInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            });
        }
    });

    // Generar conglomerado al hacer clic
    if (btnGenerar) {
        btnGenerar.addEventListener('click', function() {
            // Generar ID incremental con formato CG-XXX
            inputId.value = `CG-${String(contadorConglomerado).padStart(3, '0')}`;
            contadorConglomerado++;

            // Generar coordenadas dentro de Colombia
            const coords = randomEnRangoColombia();
            inputLat.value = coords.lat;
            inputLon.value = coords.lon;

            // Agregar marcador al mapa si está inicializado
            if (mapGlobal) {
                const lat = parseFloat(inputLat.value);
                const lon = parseFloat(inputLon.value);
                const id = inputId.value;

                // Eliminar marcador anterior si existe
                if (markerActual) {
                    mapGlobal.removeLayer(markerActual);
                }

                // Crear nuevo marcador
                markerActual = L.marker([lat, lon]).addTo(mapGlobal);
                markerActual.bindPopup(`
                    <div class="text-center">
                        <h6><strong>Nuevo Conglomerado</strong></h6>
                        <p><strong>ID:</strong> ${id}</p>
                        <small><strong>Coordenadas:</strong><br>${lat}, ${lon}</small>
                    </div>
                `).openPopup();
                
                // Centrar el mapa en el nuevo marcador
                mapGlobal.setView([lat, lon], 12);
            }

            // Limpiar mensaje
            if (messageDiv) {
                messageDiv.innerHTML = '';
                messageDiv.className = '';
            }
        });
    }

    // Guardar conglomerado con validación
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (messageDiv) {
                messageDiv.innerHTML = '';
                messageDiv.className = '';
            }

            // Activar validación de Bootstrap
            form.classList.add('was-validated');

            const idVal = (inputId.value || '').trim();
            const latVal = (inputLat.value || '').trim();
            const lonVal = (inputLon.value || '').trim();
            const nombreVal = (nombreInput.value || '').trim();
            const descripcionVal = (descripcionInput.value || '').trim();

            // Validar que se haya generado el conglomerado
            if (!idVal || !latVal || !lonVal) {
                if (messageDiv) {
                    messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Primero debe generar un conglomerado presionando el botón "Generar Conglomerado".</div>';
                    messageDiv.className = 'error';
                }
                return;
            }

            // Validar campos obligatorios
            if (!nombreVal || !descripcionVal) {
                if (messageDiv) {
                    messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Complete todos los campos obligatorios marcados en rojo.</div>';
                    messageDiv.className = 'error';
                }
                
                // Marcar campos vacíos
                if (!nombreVal) {
                    nombreInput.classList.add('is-invalid');
                    nombreInput.classList.remove('is-valid');
                }
                if (!descripcionVal) {
                    descripcionInput.classList.add('is-invalid');
                    descripcionInput.classList.remove('is-valid');
                }
                
                return;
            }

            // Validar longitud del nombre
            if (nombreVal.length < 3) {
                if (messageDiv) {
                    messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ El nombre de la brigada debe tener al menos 3 caracteres.</div>';
                    messageDiv.className = 'error';
                }
                nombreInput.classList.add('is-invalid');
                nombreInput.classList.remove('is-valid');
                return;
            } else {
                nombreInput.classList.remove('is-invalid');
                nombreInput.classList.add('is-valid');
            }

            // Validar longitud de la descripción
            if (descripcionVal.length < 10) {
                if (messageDiv) {
                    messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ La descripción debe tener al menos 10 caracteres.</div>';
                    messageDiv.className = 'error';
                }
                descripcionInput.classList.add('is-invalid');
                descripcionInput.classList.remove('is-valid');
                return;
            } else {
                descripcionInput.classList.remove('is-invalid');
                descripcionInput.classList.add('is-valid');
            }

            // Confirmar guardado
            if (!window.confirm('¿Está seguro de guardar el conglomerado?')) return;

            const conglomerado = {
                id: idVal,
                latitud: latVal,
                longitud: lonVal,
                nombreBrigada: nombreVal,
                descripcion: descripcionVal,
                area: '0.35 hectáreas',
                creadoEn: new Date().toISOString()
            };

            // Guardar en localStorage
            const stored = JSON.parse(localStorage.getItem('conglomerados') || '[]');
            stored.push(conglomerado);
            localStorage.setItem('conglomerados', JSON.stringify(stored));

            if (messageDiv) {
                messageDiv.innerHTML = '<div class="alert alert-success">✅ Conglomerado guardado correctamente.</div>';
                messageDiv.className = 'success';
            }
            
            // Limpiar formulario y validaciones
            form.reset();
            form.classList.remove('was-validated');
            
            // Limpiar campos readonly
            inputId.value = '';
            inputLat.value = '';
            inputLon.value = '';
            
            // Remover marcador del mapa
            if (markerActual && mapGlobal) {
                mapGlobal.removeLayer(markerActual);
                markerActual = null;
                mapGlobal.setView([4.5709, -74.2973], 6);
            }
            
            // Remover clases de validación
            [nombreInput, descripcionInput].forEach(input => {
                if (input) {
                    input.classList.remove('is-valid', 'is-invalid');
                }
            });

            // Ocultar mensaje después de 3 segundos
            setTimeout(() => {
                if (messageDiv) {
                    messageDiv.innerHTML = '';
                    messageDiv.className = '';
                }
            }, 3000);
        });
    }
});
// ============================================

// ============================================
// BRIGADISTA - CREACIÓN Y VALIDACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('crearBrigadistaForm');
  if (!form) return;

  const tipoDocInput = document.getElementById('tipoDoc');
  const numDocInput = document.getElementById('numDoc');
  const nombresInput = document.getElementById('nombres');
  const apellidosInput = document.getElementById('apellidos');
  const rolSelect = document.getElementById('rol');
  const contactoInput = document.getElementById('contacto');
  const messageDiv = document.getElementById('brigadistaMessage');

  // Patrones de validación
  const patterns = {
    numDoc: /^\d+$/,
    nombres: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    apellidos: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    contacto: /^(\d{7,15}|\S+@\S+\.\S+)$/
  };

  // Quitar errores cuando el usuario interactúe
  [tipoDocInput, numDocInput, nombresInput, apellidosInput, rolSelect, contactoInput].forEach(input => {
    if (input) {
      input.addEventListener('input', function() {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      });
      input.addEventListener('change', function() {
        this.classList.remove('is-invalid');
        this.classList.add('is-valid');
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    messageDiv.innerHTML = '';

    // Activar validación de Bootstrap
    form.classList.add('was-validated');

    const tipoDocVal = (tipoDocInput.value || '').trim();
    const numDocVal = (numDocInput.value || '').trim();
    const nombresVal = (nombresInput.value || '').trim();
    const apellidosVal = (apellidosInput.value || '').trim();
    const rolVal = (rolSelect.value || '').trim();
    const contactoVal = (contactoInput.value || '').trim();

    // Validar campos vacíos
    if (!tipoDocVal || !numDocVal || !nombresVal || !apellidosVal || !rolVal || !contactoVal) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Complete todos los campos obligatorios marcados en rojo.</div>';
      
      if (!tipoDocVal) tipoDocInput.classList.add('is-invalid');
      if (!numDocVal) numDocInput.classList.add('is-invalid');
      if (!nombresVal) nombresInput.classList.add('is-invalid');
      if (!apellidosVal) apellidosInput.classList.add('is-invalid');
      if (!rolVal) rolSelect.classList.add('is-invalid');
      if (!contactoVal) contactoInput.classList.add('is-invalid');
      
      return;
    }

    // Validar número de documento
    if (!patterns.numDoc.test(numDocVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Número de documento inválido (solo números).</div>';
      numDocInput.classList.add('is-invalid');
      numDocInput.classList.remove('is-valid');
      return;
    } else {
      numDocInput.classList.remove('is-invalid');
      numDocInput.classList.add('is-valid');
    }

    // Validar nombres
    if (!patterns.nombres.test(nombresVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Nombres inválidos (solo letras y espacios).</div>';
      nombresInput.classList.add('is-invalid');
      nombresInput.classList.remove('is-valid');
      return;
    } else {
      nombresInput.classList.remove('is-invalid');
      nombresInput.classList.add('is-valid');
    }

    // Validar apellidos
    if (!patterns.apellidos.test(apellidosVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Apellidos inválidos (solo letras y espacios).</div>';
      apellidosInput.classList.add('is-invalid');
      apellidosInput.classList.remove('is-valid');
      return;
    } else {
      apellidosInput.classList.remove('is-invalid');
      apellidosInput.classList.add('is-valid');
    }

    // Validar contacto
    if (!patterns.contacto.test(contactoVal)) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Contacto inválido (debe ser teléfono de 7-15 dígitos o email válido).</div>';
      contactoInput.classList.add('is-invalid');
      contactoInput.classList.remove('is-valid');
      return;
    } else {
      contactoInput.classList.remove('is-invalid');
      contactoInput.classList.add('is-valid');
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
    
    // Limpiar formulario y validaciones
    form.reset();
    form.classList.remove('was-validated');
    
    // Remover clases de validación
    [tipoDocInput, numDocInput, nombresInput, apellidosInput, rolSelect, contactoInput].forEach(input => {
      if (input) {
        input.classList.remove('is-valid', 'is-invalid');
      }
    });

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      messageDiv.innerHTML = '';
    }, 3000);
  });
});

// ============================================
// BRIGADA - CREACIÓN Y GESTIÓN
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('crearBrigadaForm');
  if (!form) return;

  const idInput = document.getElementById('idBrigada');
  const liderSelect = document.getElementById('lider'); 
  const participantesContainer = document.getElementById('participantes-container');
  const conglomeradoSelect = document.getElementById('conglomerado');
  const descripcionInput = document.getElementById('descripcion');
  const objetivoInput = document.getElementById('objetivo');
  const messageDiv = document.getElementById('brigadaMessage');

  // Generar ID automáticamente al cargar la página
  if (idInput) {
    idInput.value = 'BRG-' + (Math.floor(1000 + Math.random() * 9000));
  }

  // Crear una fila de participante
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

  // Inicializar con un participante
  function initParticipants() {
    if (participantesContainer && !participantesContainer.querySelector('.participante-row')) {
      participantesContainer.appendChild(createParticipantRow());
    }
  }

  // Botones + y - para agregar/quitar participantes
  if (participantesContainer) {
    participantesContainer.addEventListener('click', (ev) => {
      const t = ev.target;
      if (t.classList.contains('add-participante')) {
        participantesContainer.appendChild(createParticipantRow());
        return;
      }
      if (t.classList.contains('remove-participante')) {
        const row = t.closest('.participante-row');
        const rows = participantesContainer.querySelectorAll('.participante-row');
        if (rows.length > 1) {
          row.remove();
        } else {
          row.querySelector('.participante-select').value = '';
          row.querySelector('.rol-select').value = '';
        }
      }
    });
  }

  // Quitar errores cuando el usuario interactúe
  [liderSelect, conglomeradoSelect, descripcionInput, objetivoInput].forEach(input => {
    if (input) {
      input.addEventListener('input', function() {
        this.classList.remove('is-invalid');
      });
    }
  });

  // Quitar errores en participantes
  if (participantesContainer) {
    participantesContainer.addEventListener('change', (e) => {
      if (e.target.classList.contains('participante-select') || e.target.classList.contains('rol-select')) {
        e.target.classList.remove('is-invalid');
      }
    });
  }

  // Guardar brigada con validación
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    messageDiv.innerHTML = '';

    // Activar validación de Bootstrap
    form.classList.add('was-validated');

    const idVal = (idInput.value || '').trim();
    const liderVal = (liderSelect.value || '').trim();
    const conglomeradoVal = (conglomeradoSelect.value || '').trim();
    const descVal = (descripcionInput.value || '').trim();
    const objVal = (objetivoInput.value || '').trim();

    // Validar campos principales
    if (!idVal || !liderVal || !conglomeradoVal || !descVal || !objVal) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Complete todos los campos obligatorios marcados en rojo.</div>';
      
      if (!liderVal) liderSelect.classList.add('is-invalid');
      if (!conglomeradoVal) conglomeradoSelect.classList.add('is-invalid');
      if (!descVal) descripcionInput.classList.add('is-invalid');
      if (!objVal) objetivoInput.classList.add('is-invalid');
      
      return;
    }

    // Validar participantes
    const partRows = participantesContainer.querySelectorAll('.participante-row');
    if (partRows.length === 0) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Agregue al menos un participante.</div>';
      return;
    }

    let participantesValidos = true;
    for (const r of partRows) {
      const personaSelect = r.querySelector('.participante-select');
      const rolSelect = r.querySelector('.rol-select');
      const persona = (personaSelect.value || '').trim();
      const rol = (rolSelect.value || '').trim();
      
      if (!persona || !rol) {
        participantesValidos = false;
        if (!persona) personaSelect.classList.add('is-invalid');
        if (!rol) rolSelect.classList.add('is-invalid');
      }
    }

    if (!participantesValidos) {
      messageDiv.innerHTML = '<div class="alert alert-danger">⚠️ Cada participante debe tener persona y rol seleccionados.</div>';
      return;
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
    
    // Limpiar formulario y validaciones
    form.reset();
    form.classList.remove('was-validated');
    participantesContainer.innerHTML = '';
    participantesContainer.appendChild(createParticipantRow());
    idInput.value = 'BRG-' + (Math.floor(1000 + Math.random() * 9000));
    
    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      messageDiv.innerHTML = '';
    }, 3000);
  });

  initParticipants();
});

// ============================================
// REPORTES - FILTRADO Y VISUALIZACIÓN
// ============================================
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
        { id: 'CG-001', titulo: 'Conglomerado Generado', descripcion: 'Conglomerado generado mediante software.' },
        { id: 'CG-002', titulo: 'Conglomerado Generado', descripcion: 'Conglomerado generado mediante software.' },
        { id: 'CG-003', titulo: 'Conglomerado Generado', descripcion: 'Conglomerado generado mediante software.' }
    ]
};

// Función para renderizar los reportes según el filtro
function renderizarReportes(tipo) {
    const contenedor = document.getElementById('contenedorReportes');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    const reportes = reportesEjemplo[tipo] || [];
    
    if (reportes.length === 0) {
        contenedor.innerHTML = '<p class="text-center text-muted">No hay reportes para este filtro.</p>';
        return;
    }

    // Seleccionar imagen según el tipo de reporte
    let imagen = 'graf1.jpeg';
    if (tipo === 'brregistradas') imagen = 'graf2.jpeg';
    if (tipo === 'conregistrados') imagen = 'graf3.jpeg';

    reportes.forEach((rep) => {
        const card = document.createElement('div');
        card.className = 'alert alert-secondary mb-3 d-flex align-items-center';
        card.innerHTML = `
            <img src="img/${imagen}" alt="Gráfico ${imagen}" 
                style="width:160px; height:auto; margin-right:24px; border-radius:8px; cursor:pointer;"
                data-bs-toggle="modal" data-bs-target="#imgModal" data-img="img/${imagen}">
            <div>
                <strong>${rep.titulo}</strong><br>
                <small>ID: ${rep.id}</small><br>
                ${rep.descripcion}
            </div>
        `;
        contenedor.appendChild(card);
    });

    // Evento para mostrar la imagen en el modal
    contenedor.querySelectorAll('img[data-bs-toggle="modal"]').forEach(img => {
        img.addEventListener('click', function() {
            const modalImg = document.getElementById('imgModalImg');
            if (modalImg) {
                modalImg.src = this.getAttribute('data-img');
            }
        });
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