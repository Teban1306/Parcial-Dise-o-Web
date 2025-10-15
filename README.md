# IFN Gestor de Brigadas

Sistema web para la gestión de brigadas y conglomerados forestales del **Inventario Forestal Nacional (IFN)**, desarrollado para el IDEAM (Instituto de Hidrología, Meteorología y Estudios Ambientales de Colombia).

---

## Características principales

- **Autenticación de usuarios** (Científico y Coordinador)
- **Gestión de brigadas:** creación, registro y visualización de brigadistas y brigadas
- **Gestión de conglomerados:** generación automática de ID y coordenadas dentro de Colombia continental
- **Formularios independientes:** cada formulario principal (brigada, brigadista, conglomerado) tiene su propia página HTML
- **Visualización de mapas interactivos** con Leaflet y capas satelitales
- **Reportes dinámicos** con filtro y visualización de gráficos ampliables
- **Interfaz moderna y responsiva** con Bootstrap 5

---

## Estructura del proyecto

```
/Parcial-Dise-o-Web
│
├── img/                      # Imágenes y gráficos (logo, mapas, reportes, etc.)
├── script.js                 # Lógica principal de la aplicación (JS)
├── styles.css                # Estilos personalizados generales (CSS)
├── stylesBrigada.css         # Estilos específicos para brigadas
├── stylesBrigadista.css      # Estilos específicos para brigadistas
├── stylesConglomerado.css    # Estilos específicos para conglomerados
├── Login.html                # Página de inicio de sesión
├── vistaCientifico.html      # Vista para usuario científico
├── vistaCoordinador.html     # Vista para usuario coordinador
├── brigadaForm.html          # Formulario independiente para crear brigadas
├── brigadistaForm.html       # Formulario independiente para crear brigadistas
├── conglomeradoForm.html     # Formulario independiente para crear conglomerados
└── README.md                 # Este archivo
```

---

## Instalación y uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/Parcial-Dise-o-Web.git
   cd Parcial-Dise-o-Web
   ```


2. **Abre el archivo `Login.html` en tu navegador** para iniciar sesión y navegar por el sistema.

3. **Navega entre formularios** usando los botones y enlaces de la interfaz, que te llevarán a las páginas independientes de creación de brigadas, brigadistas y conglomerados.

---

## Credenciales de prueba

- **Científico:**  
  Usuario: `isabel@ideam.com`  
  Contraseña: `isabel123`

- **Coordinador:**  
  Usuario: `cris@ideam.com`  
  Contraseña: `cris123`

---

## Tecnologías utilizadas

- [Bootstrap 5](https://getbootstrap.com/)
- [Leaflet.js](https://leafletjs.com/)
- [Animate.css](https://animate.style/)
- HTML5, CSS3, JavaScript

---

## Notas

- Las coordenadas de conglomerados se generan automáticamente dentro de un rango seguro de Colombia continental, evitando zonas marítimas.
- Los reportes incluyen imágenes ampliables (haz clic en la imagen para verla en grande).
- El sistema es completamente frontend y no requiere backend para pruebas básicas.
- Cada formulario principal se encuentra en un archivo HTML independiente para facilitar la navegación y el mantenimiento.

---

## Créditos

**Universidad:** Universidad de investigacion y desarrollo
**Curso:** Diseño Web  
**Equipo de diseño web:**  
- Esteban Lozano  
- Daniela Benítez  
- Nataly Guevara
- Silvia Carillo

---

## Licencia

Este proyecto es solo para fines académicos y demostrativos.  
Desarrollado para el curso de Diseño Web.

---

**Desarrollado por:**  
UDI Curso Diseño web  
2025