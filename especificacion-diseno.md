# Especificación de Diseño de Software
## SICEN — Sistema de Gestión de Censos Escolares

| Campo | Detalle |
|---|---|
| **Proyecto** | SOFT-11C1 Proyecto Integrador 1 |
| **Estudiante** | Krystell Porras Rivera |
| **Institución** | Universidad CENFOTEC |
| **Docente** | Verónica Mora Lezcano |
| **Período** | 2026-C3 |

---

## 1. Propósito y alcance del sistema

### 1.1 Propósito

Este documento describe las decisiones de diseño del sistema SICEN: arquitectura técnica, tecnologías, modelado, interfaz de usuario y flujo de navegación. Complementa la ERS y sirve como guía para la fase de implementación.

### 1.2 Arquitectura, base de datos y tecnologías

El sistema sigue una **arquitectura de tres capas** con el **patrón Modelo-Vista-Controlador (MVC)**:

| Capa | Descripción | Tecnologías |
|---|---|---|
| **Presentación (Vista)** | Interfaz de usuario. Captura datos y los envía al backend vía fetch. | HTML5, CSS3, JavaScript ES6+, Bootstrap 5 |
| **Lógica (Controlador)** | Aplica reglas de negocio, gestiona rutas REST. | Node.js, Express.js |
| **Datos (Modelo)** | Persistencia de la información en la nube. | MongoDB Atlas, Mongoose |

**Comunicación entre capas:** HTTP/HTTPS + `fetch` API. Datos en formato **JSON**.

#### Base de datos

El sistema utilizará **MongoDB Atlas** como base de datos NoSQL en la nube. Permite almacenar documentos flexibles en colecciones, lo que facilita el manejo de estructuras variadas propias de los formularios censales. La conexión se gestiona a través de **Mongoose** como ODM.

> Nota: El diseño detallado de colecciones se especificará a partir de la semana 6.

#### Stack tecnológico

| Tecnología | Uso |
|---|---|
| HTML5 / CSS3 / JavaScript ES6+ | Frontend — estructura, estilos e interactividad |
| Bootstrap 5 | Framework de diseño responsivo |
| Node.js + Express.js | Backend — entorno de ejecución y API REST |
| MongoDB Atlas | Base de datos NoSQL en la nube |
| Mongoose | ODM para MongoDB |

### 1.3 Alcance funcional

- Módulo de autenticación y control de acceso por rol
- Módulo de gestión de formularios censales (CRUD)
- Módulo de configuración y control de censos
- Módulo de seguimiento técnico (revisión, aceptación, devolución)
- Módulo de llenado censal por centros educativos
- Módulo de supervisión y alertas
- Módulo de reportes y exportación

---

## 2. Modelado del sistema

### 2.1 Diagrama de casos de uso

> **Ver en Figma:** [Abrir diagrama de casos de uso](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?page-id=6%3A2&node-id=6-3)

**Actores:** Jefatura DAE · Técnico DAE · Director del Centro Educativo · Supervisor

**Relaciones include / extend:**
- Enviar formulario censal **→ `<<include>>`→** Validar campos obligatorios
- Devolver formulario **→ `<<include>>`→** Registrar en historial auditable
- Generar informe **→ `<<extend>>`→** Exportar en PDF (si el usuario lo solicita)

---

## 3. Interfaz de usuario (UI/UX)

### 3.1 Wireframes y prototipos

> **Archivo Figma:** [SICEN — Wireframes y Prototipos](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-2)

Todos los wireframes están disponibles en el archivo de Figma. Cada link dirige directamente al frame correspondiente:

| ID | Pantalla | Actor | Link directo |
|---|---|---|---|
| WF-01 | Login | Todos | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-2) |
| WF-02 | Dashboard Jefatura DAE | Jefatura DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-14) |
| WF-03 | Listado de formularios | Jefatura DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-67) |
| WF-04 | Constructor de formulario | Jefatura DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-115) |
| WF-05 | Configurar censo | Jefatura DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-146) |
| WF-06 | Gestión de colaboradores | Jefatura DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-180) |
| WF-07 | Reportes generales | Jefatura DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-221) |
| WF-08 | Dashboard Técnico DAE | Técnico DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-272) |
| WF-09 | Revisión de formulario | Técnico DAE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-322) |
| WF-10 | Dashboard Director CE | Director CE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-351) |
| WF-11 | Llenado de formulario | Director CE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-403) |
| WF-12 | Estado del censo | Director CE | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-434) |
| WF-13 | Dashboard Supervisor | Supervisor | [Ver en Figma](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-477) |

### 3.2 Guía de estilos

#### Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#185FA5` | Color institucional, botones primarios, navbar |
| `--color-primary-dark` | `#042C53` | Hover de botones, textos sobre fondo claro |
| `--color-primary-light` | `#E6F1FB` | Fondos de secciones destacadas |
| `--color-success` | `#0F6E56` | Estados aceptados, acciones positivas |
| `--color-warning` | `#EF9F27` | Alertas, estados pendientes |
| `--color-danger` | `#DC3545` | Errores, estados devueltos, acciones destructivas |
| `--color-bg` | `#F8F9FA` | Fondo general de la aplicación |
| `--color-surface` | `#FFFFFF` | Fondo de tarjetas y paneles |
| `--color-text` | `#212529` | Texto principal |
| `--color-text-secondary` | `#6C757D` | Texto secundario y etiquetas |
| `--color-border` | `#DEE2E6` | Bordes de componentes |

> **Accesibilidad:** implementar `@media (prefers-color-scheme: dark)` y garantizar contraste ≥ 4.5:1 (WCAG 2.1 AA).

#### Tipografía

| Elemento | Fuente | Tamaño | Peso |
|---|---|---|---|
| H1 — Título principal | Inter / Roboto | 24px | 700 |
| H2 — Sección | Inter / Roboto | 20px | 600 |
| Body | Inter / Roboto | 14px | 400 |
| Label | Inter / Roboto | 13px | 500 |
| Small | Inter / Roboto | 12px | 400 |

#### Componentes Bootstrap 5

| Componente | Uso |
|---|---|
| `btn btn-primary` | Acciones principales |
| `btn btn-success` | Aceptar formularios |
| `btn btn-danger` | Eliminar, rechazar |
| `badge bg-success/warning/danger/primary` | Estado del formulario censal |
| `table table-hover table-responsive` | Listados de centros y formularios |
| `modal` | Confirmación de acciones irreversibles |
| `alert` | Mensajes de sistema |
| `navbar` | Barra superior con rol del usuario |
| `card` | Paneles de estadísticas en dashboards |

**Badges de estado del censo:**

| Estado | Clase | Color |
|---|---|---|
| Pendiente | `badge bg-warning text-dark` | Amarillo |
| En revisión | `badge bg-primary` | Azul |
| Aceptado | `badge bg-success` | Verde |
| Devuelto | `badge bg-danger` | Rojo |
| Cerrado | `badge bg-secondary` | Gris |

### 3.3 Restricciones de usabilidad y accesibilidad

#### Usabilidad
- Sistema **responsivo** adaptado a móvil (≥320px), tableta (≥768px) y escritorio (≥1024px) con Bootstrap 5.
- Toda funcionalidad principal accesible en **máximo 3 clics** desde el panel del usuario.
- **Validación en tiempo real** en formularios con mensajes de error específicos por campo.
- **Indicadores de carga** (spinners) durante operaciones asíncronas.
- **Modal de confirmación** obligatorio para acciones destructivas (eliminar, cerrar censo).
- **Paginación** en listados de más de 10 elementos.

#### Accesibilidad (WCAG 2.1 — Nivel AA)
- Contraste de color mínimo **4.5:1** para texto normal y **3:1** para texto grande.
- Soporte para **modo oscuro** y **alto contraste** (`prefers-color-scheme`, `prefers-contrast`).
- **Modo claro** como predeterminado (requerimiento explícito del cliente).
- Navegación completa por **teclado** (`Tab`, `Enter`, `Esc`).
- Atributos **ARIA** en todos los elementos interactivos.
- **Texto alternativo** en todas las imágenes e íconos funcionales.
- Uso de elementos **semánticos HTML5** (`<main>`, `<nav>`, `<header>`, `<section>`).
- Etiquetas `<label>` asociadas a todos los campos de formulario.

---

## 4. Diseño de navegación (Mapa de sitio)

### Jefatura DAE → [WF-01](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-2) → [WF-02](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-14)
```
Login (WF-01) → Dashboard (WF-02)
  ├── Formularios censales (WF-03)
  │     ├── Crear / editar formulario (WF-04)
  │     └── [Eliminar con confirmación modal]
  ├── Configurar censos (WF-05)
  │     └── Abrir / pausar / cerrar censo
  ├── Colaboradores (WF-06)
  │     └── Asignar región / circuito
  └── Reportes generales (WF-07)
```

### Técnico DAE → [WF-01](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-2) → [WF-08](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-272)
```
Login (WF-01) → Dashboard Técnico (WF-08)
  └── Centros asignados → Revisión de formulario (WF-09)
        ├── Aceptar formulario
        └── Devolver para subsanación
```

### Director del CE → [WF-01](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-2) → [WF-10](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-351)
```
Login (WF-01) → Dashboard Director (WF-10)
  ├── Censos disponibles → Llenado de formulario (WF-11)
  │     └── Consultar instructivo / Enviar / Guardar borrador
  └── Estado del censo (WF-12)
        └── Corregir y reenviar formulario
```

### Supervisor → [WF-01](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-2) → [WF-13](https://www.figma.com/design/ZbpgIWFL3CoPA3YW3Bd1xP/SICEN-%E2%80%94-Wireframes-y-Prototipos?node-id=4-477)
```
Login (WF-01) → Dashboard Supervisor (WF-13)
  ├── Centros supervisados → Ver censos aceptados
  └── Notificaciones y alertas
```
