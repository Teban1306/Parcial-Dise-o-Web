# IFN Gestor de Brigadas

Sistema web para la gestión de brigadas y conglomerados forestales del **Inventario Forestal Nacional (IFN)**, desarrollado para el IDEAM (Instituto de Hidrología, Meteorología y Estudios Ambientales de Colombia).

## Características principales

- **Autenticación de usuarios** (Científico y Coordinador)
- **Gestión de brigadas**: creación, registro y visualización de brigadistas y brigadas
- **Gestión de conglomerados**: generación automática de ID y coordenadas dentro de Colombia continental
- **Visualización de mapas interactivos** con Leaflet y capas satelitales
- **Reportes dinámicos** con filtro y visualización de gráficos ampliables
- **Interfaz moderna y responsiva** con Bootstrap 5

## Estructura del proyecto

```
/Parcial-Dise-o-Web
│
├── img/                  # Imágenes y gráficos (logo, mapas, reportes, etc.)
├── script.js             # Lógica principal de la aplicación (JS)
├── styles.css            # Estilos personalizados (CSS)
├── Login.html            # Página de inicio de sesión
├── vistaCientifico.html  # Vista para usuario científico
├── vistaCoordinador.html # Vista para usuario coordinador
└── README.md             # Este archivo
```

## Instalación y uso

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/Parcial-Dise-o-Web.git
   cd Parcial-Dise-o-Web
   ```

2. **Agrega tus imágenes** en la carpeta `img/` (por ejemplo: `ideam.png`, `graf1.jpeg`, `graf2.jpeg`, `graf3.jpeg`, etc).

3. **Abre el archivo `Login.html` en tu navegador** para iniciar sesión y navegar por el sistema.

## Credenciales de prueba

- **Científico:**  
  Usuario: `isabel@ideam.com`  
  Contraseña: `isabel123`

- **Coordinador:**  
  Usuario: `cris@ideam.com`  
  Contraseña: `cris123`

## Tecnologías utilizadas

- [Bootstrap 5](https://getbootstrap.com/)
- [Leaflet.js](https://leafletjs.com/)
- [Animate.css](https://animate.style/)
- HTML5, CSS3, JavaScript

## Notas

- Las coordenadas de conglomerados se generan automáticamente dentro de un rango seguro de Colombia continental, evitando zonas marítimas.
- Los reportes incluyen imágenes ampliables (haz clic en la imagen para verla en grande).
- El sistema es completamente frontend y no requiere backend para pruebas básicas.

## Licencia

Este proyecto es solo para fines académicos y demostrativos.  
Desarrollado para el curso de Diseño Web.

---

**Desarrollado por:**  
Estudiantes de Diseño Web - 2025