# Especificación de Requisitos de Software (ERS)
## SICEN — Sistema de Gestión de Censos Escolares

| Campo | Detalle |
|---|---|
| **Proyecto** | SOFT-11C1 Proyecto Integrador 1 |
| **Estudiante** | [TU NOMBRE COMPLETO] |
| **Institución** | Universidad CENFOTEC |
| **Docente** | Verónica Mora Lezcano |
| **Período** | 2026-C3 |
| **Fecha** | 17 de setiembre de 2026 |
| **Versión** | 1.0 |

---

## 1. Descripción general del sistema

### 1.1 Propósito

El sistema SICEN tiene como propósito modernizar y automatizar los procesos de levantamiento, registro, seguimiento y validación de información estadística de los centros educativos públicos y privados del país, actualmente gestionados de forma manual por el Ministerio de Educación Pública (MEP) mediante formularios de Excel y correo electrónico.

### 1.2 Alcance

SICEN es una aplicación web que centraliza la gestión de censos escolares. Permitirá a la Dirección de Análisis Estadístico (DAE) del MEP crear y configurar formularios censales, asignar censos a centros educativos según su oferta académica, dar seguimiento al proceso de llenado y validación, y generar reportes de avance. Los centros educativos podrán completar y enviar sus censos desde la plataforma, y los supervisores podrán monitorear el estado de los centros a su cargo.

El sistema **no incluye** integración con firma digital, autenticación institucional externa del MEP, ni generación de manuales técnicos de usuario.

### 1.3 Perfiles de usuario y actores

#### 1.3.1 Jefatura de la DAE — Administrador general
Persona responsable de la gestión completa del sistema. Construye y administra los formularios censales, configura los censos, gestiona a los colaboradores y accede a reportes generales.

#### 1.3.2 Técnico de la DAE — Colaborador de seguimiento
Funcionario de la DAE asignado a una región o circuito específico. Se encarga de revisar los formularios enviados por los centros educativos, aceptarlos o devolverlos para corrección, y generar informes de seguimiento.

#### 1.3.3 Director del centro educativo (o encargado)
Persona responsable de un centro educativo. Completa y envía los formularios censales asignados a su institución, consulta instructivos y visualiza el estado de sus envíos.

#### 1.3.4 Supervisor
Funcionario que supervisa un grupo de centros educativos. Accede al sistema con permisos de solo visualización y recibe alertas sobre el avance de los censos de los centros bajo su cargo.

### 1.4 Suposiciones

- Todos los usuarios cuentan con acceso a Internet y a un dispositivo con navegador web moderno.
- Los centros educativos cuentan con al menos una persona designada para completar los formularios censales.
- Los datos de centros educativos (nombre, circuito, región, oferta educativa) son preexistentes y serán cargados en el sistema durante la configuración inicial.
- El MEP proporcionará la información necesaria para la configuración inicial del sistema.
- Los usuarios cuentan con una dirección de correo electrónico institucional para la autenticación.

### 1.5 Dependencias

- Disponibilidad del servicio de MongoDB Atlas para el almacenamiento de datos.
- Disponibilidad de un servidor Node.js para el despliegue del backend.
- Acceso a Internet para todos los usuarios del sistema.

### 1.6 Restricciones generales

- Los formularios censales únicamente admiten tres tipos de preguntas: selección única, selección múltiple y descripción (respuesta abierta).
- La documentación del proyecto debe estar redactada en español.
- El sistema debe funcionar correctamente en los navegadores Chrome, Firefox y Edge en sus versiones más recientes.
- El sistema debe ser responsivo y adaptarse a dispositivos móviles, tabletas y computadoras de escritorio.
- El sistema debe cumplir con estándares de accesibilidad para personas con discapacidad visual (alto contraste y modo claro).

---

## 2. Requisitos funcionales

### Módulo 1: Autenticación y control de acceso

| ID | Descripción | Actor |
|---|---|---|
| RF-01 | El sistema debe permitir a los usuarios autenticarse mediante correo electrónico y contraseña. | Todos |
| RF-02 | El sistema debe controlar el acceso a las funcionalidades disponibles según el rol asignado a cada usuario. | Todos |
| RF-03 | El sistema debe redirigir a cada usuario a su panel correspondiente según su rol tras iniciar sesión. | Todos |

### Módulo 2: Gestión de formularios censales

| ID | Descripción | Actor |
|---|---|---|
| RF-04 | El sistema debe permitir a la Jefatura DAE crear formularios censales desde cero. | Jefatura DAE |
| RF-05 | El sistema debe permitir a la Jefatura DAE crear formularios censales a partir de plantillas existentes. | Jefatura DAE |
| RF-06 | El sistema debe permitir a la Jefatura DAE editar formularios censales existentes. | Jefatura DAE |
| RF-07 | El sistema debe permitir a la Jefatura DAE eliminar formularios censales. | Jefatura DAE |
| RF-08 | El sistema debe permitir agregar preguntas de selección única a los formularios censales. | Jefatura DAE |
| RF-09 | El sistema debe permitir agregar preguntas de selección múltiple a los formularios censales. | Jefatura DAE |
| RF-10 | El sistema debe permitir agregar preguntas de tipo descripción (respuesta abierta) a los formularios censales. | Jefatura DAE |
| RF-11 | El sistema debe permitir personalizar la apariencia del formulario censal (colores, logo, encabezado). | Jefatura DAE |
| RF-12 | El sistema debe permitir adjuntar instructivos o manuales de consulta a cada formulario censal. | Jefatura DAE |
| RF-13 | El sistema debe permitir a la Jefatura DAE definir el flujo de aprobación para cada censo. | Jefatura DAE |

### Módulo 3: Administración de censos y colaboradores

| ID | Descripción | Actor |
|---|---|---|
| RF-14 | El sistema debe permitir registrar colaboradores de la DAE en el sistema. | Jefatura DAE |
| RF-15 | El sistema debe permitir asignar roles y permisos a los colaboradores por dirección regional o circuito. | Jefatura DAE |
| RF-16 | El sistema debe permitir configurar censos asociando formularios a modelos de oferta educativa específicos. | Jefatura DAE |
| RF-17 | El sistema debe permitir definir fechas de apertura y cierre para cada censo. | Jefatura DAE |
| RF-18 | El sistema debe permitir a la Jefatura DAE abrir un censo manualmente. | Jefatura DAE |
| RF-19 | El sistema debe permitir a la Jefatura DAE pausar un censo manualmente. | Jefatura DAE |
| RF-20 | El sistema debe permitir a la Jefatura DAE cerrar un censo manualmente. | Jefatura DAE |
| RF-21 | El sistema debe permitir configurar mensajes personalizados de alerta y aviso informativo en el sistema de notificaciones. | Jefatura DAE |
| RF-22 | El sistema debe permitir a la Jefatura DAE acceder a visores y reportes generales del estado de los censos. | Jefatura DAE |

### Módulo 4: Seguimiento técnico

| ID | Descripción | Actor |
|---|---|---|
| RF-23 | El sistema debe permitir al Técnico DAE visualizar únicamente los centros educativos asignados según su configuración de perfil. | Técnico DAE |
| RF-24 | El sistema debe permitir al Técnico DAE revisar los formularios remitidos por los centros educativos asignados. | Técnico DAE |
| RF-25 | El sistema debe permitir al Técnico DAE consultar el estado actual de cada formulario censal. | Técnico DAE |
| RF-26 | El sistema debe permitir al Técnico DAE aceptar formularios censales correctamente completados. | Técnico DAE |
| RF-27 | El sistema debe permitir al Técnico DAE devolver formularios para subsanación, registrando la acción y el motivo en un historial auditable. | Técnico DAE |
| RF-28 | El sistema debe permitir al Técnico DAE enviar comunicados y alertas al supervisor del centro educativo correspondiente. | Técnico DAE |
| RF-29 | El sistema debe permitir al Técnico DAE generar informes de seguimiento del avance censal. | Técnico DAE |
| RF-30 | El sistema debe permitir al Técnico DAE generar cortes de matrícula censal. | Técnico DAE |
| RF-31 | El sistema debe permitir al Técnico DAE consultar el historial de gestiones realizadas sobre cada censo. | Técnico DAE |

### Módulo 5: Llenado censal

| ID | Descripción | Actor |
|---|---|---|
| RF-32 | El sistema debe permitir al Director del CE acceder al expediente de su centro educativo. | Director CE |
| RF-33 | El sistema debe mostrar al Director del CE los censos disponibles según la oferta educativa autorizada de su centro. | Director CE |
| RF-34 | El sistema debe permitir al Director del CE completar formularios censales con datos del centro precargados. | Director CE |
| RF-35 | El sistema debe permitir al Director del CE consultar los instructivos adjuntos a cada formulario antes y durante el llenado. | Director CE |
| RF-36 | El sistema debe mostrar al Director del CE el estado actual del censo de su centro (pendiente, en revisión, aceptado, devuelto). | Director CE |
| RF-37 | El sistema debe permitir al Director del CE enviar el formulario censal completo. | Director CE |
| RF-38 | El sistema debe notificar al Director del CE cuando el estado de su formulario cambie (aceptado, devuelto para subsanación). | Director CE |
| RF-39 | El sistema debe permitir al Director del CE corregir y reenviar formularios devueltos para subsanación. | Director CE |
| RF-40 | El sistema debe permitir al Director del CE consultar el historial de gestiones realizadas sobre sus envíos. | Director CE |

### Módulo 6: Supervisión

| ID | Descripción | Actor |
|---|---|---|
| RF-41 | El sistema debe permitir al Supervisor ingresar con permisos de visualización y verificación. | Supervisor |
| RF-42 | El sistema debe permitir al Supervisor consultar los censos aceptados de los centros educativos bajo su supervisión. | Supervisor |
| RF-43 | El sistema debe notificar al Supervisor sobre el estado del llenado de los formularios de los centros a su cargo. | Supervisor |

---

## 3. Restricciones de diseño e implementación

### 3.1 Tecnologías obligatorias

| Tecnología | Rol | Nivel |
|---|---|---|
| HTML5 | Estructura de las páginas web | Frontend |
| CSS3 | Estilos visuales | Frontend |
| JavaScript (ES6+) | Lógica del cliente | Frontend |
| Bootstrap 5 | Framework de diseño responsivo | Frontend |
| Node.js | Entorno de ejecución del servidor | Backend |
| Express.js | Framework para rutas y API REST | Backend |
| MongoDB Atlas | Base de datos en la nube | Base de datos |
| Mongoose | ODM para MongoDB | Backend |

> Nota: Se permite el uso de React, Vue o Angular como framework de frontend adicional, ya que son extensiones de HTML, CSS y JavaScript.

### 3.2 Normativas y estándares

#### 3.2.1 Convenciones de nomenclatura

- **Archivos y carpetas:** minúscula, palabras separadas por guiones.
  - ✅ `formulario-censal.js` &nbsp;&nbsp; ❌ `FormularioCensal.js`
- **Variables y funciones:** camelCase.
  - ✅ `obtenerFormulario()` &nbsp;&nbsp; ❌ `ObtenerFormulario()`
- **Clases y modelos:** PascalCase.
  - ✅ `FormularioCensal` &nbsp;&nbsp; ❌ `formularioCensal`
- **Constantes:** UPPER_SNAKE_CASE.
  - ✅ `MAX_INTENTOS` &nbsp;&nbsp; ❌ `maxIntentos`
- **Idioma:** documentación en **español**. Código (variables, funciones, comentarios) en **inglés**, de forma consistente en todo el proyecto (frontend y backend).

#### 3.2.2 Estrategia de branches

| Rama | Propósito |
|---|---|
| `main` | Versiones estables entregadas al cliente. Solo recibe merges en las semanas de entrega (semanas 5, 8, 10, 14). |
| `develop` | Rama de integración. Todas las features se fusionan aquí antes de pasar a `main`. |
| `feature/nombre-funcionalidad` | Desarrollo de una nueva funcionalidad. Ej: `feature/login-usuario` |
| `fix/descripcion-bug` | Corrección de un error específico. Ej: `fix/validacion-formulario` |
| `docs/descripcion` | Cambios exclusivos en documentación. Ej: `docs/actualizar-ers` |

**Reglas:**
- Nunca hacer push directo a `main`.
- Crear un branch por cada funcionalidad o corrección.
- Hacer merge a `develop` una vez que la funcionalidad esté completa y probada.

#### 3.2.3 Tipos de commits

Los mensajes de commit deben seguir el formato: `tipo: descripción breve en minúscula`.

| Tipo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad implementada |
| `fix:` | Corrección de un error |
| `docs:` | Cambios en documentación |
| `chore:` | Configuración, dependencias, tareas de mantenimiento |
| `refactor:` | Reestructuración de código sin cambiar funcionalidad |
| `style:` | Cambios de formato que no afectan la lógica |
| `test:` | Adición o modificación de pruebas |

**Ejemplos:**
```
feat: crear formulario censal con preguntas dinámicas
fix: corregir validacion en envio de censo
docs: actualizar matriz de trazabilidad
chore: instalar dependencias de express y mongoose
```

---

## 4. Matriz de trazabilidad

| ID Req | Descripción corta | Épica Jira | Historia de usuario Jira |
|---|---|---|---|
| RF-01 | Autenticación por correo y contraseña | EPIC-01: Autenticación | HU-01 |
| RF-02 | Control de acceso por rol | EPIC-01: Autenticación | HU-02 |
| RF-03 | Redirección por rol al iniciar sesión | EPIC-01: Autenticación | HU-03 |
| RF-04 | Crear formulario censal desde cero | EPIC-02: Formularios | HU-04 |
| RF-05 | Crear formulario desde plantilla | EPIC-02: Formularios | HU-05 |
| RF-06 | Editar formulario censal | EPIC-02: Formularios | HU-06 |
| RF-07 | Eliminar formulario censal | EPIC-02: Formularios | HU-07 |
| RF-08 | Agregar pregunta selección única | EPIC-02: Formularios | HU-08 |
| RF-09 | Agregar pregunta selección múltiple | EPIC-02: Formularios | HU-09 |
| RF-10 | Agregar pregunta descripción | EPIC-02: Formularios | HU-10 |
| RF-11 | Personalizar apariencia del formulario | EPIC-02: Formularios | HU-11 |
| RF-12 | Adjuntar instructivos al formulario | EPIC-02: Formularios | HU-12 |
| RF-13 | Definir flujo de aprobación | EPIC-02: Formularios | HU-13 |
| RF-14 | Registrar colaboradores DAE | EPIC-03: Admin censos | HU-14 |
| RF-15 | Asignar roles y permisos por región | EPIC-03: Admin censos | HU-15 |
| RF-16 | Configurar censo por oferta educativa | EPIC-03: Admin censos | HU-16 |
| RF-17 | Definir fechas apertura/cierre | EPIC-03: Admin censos | HU-17 |
| RF-18 | Abrir censo manualmente | EPIC-03: Admin censos | HU-18 |
| RF-19 | Pausar censo manualmente | EPIC-03: Admin censos | HU-19 |
| RF-20 | Cerrar censo manualmente | EPIC-03: Admin censos | HU-20 |
| RF-21 | Configurar mensajes de notificación | EPIC-03: Admin censos | HU-21 |
| RF-22 | Ver reportes generales | EPIC-03: Admin censos | HU-22 |
| RF-23 | Ver solo centros asignados (Técnico) | EPIC-04: Seguimiento | HU-23 |
| RF-24 | Revisar formularios enviados | EPIC-04: Seguimiento | HU-24 |
| RF-25 | Consultar estado de formularios | EPIC-04: Seguimiento | HU-25 |
| RF-26 | Aceptar formulario censal | EPIC-04: Seguimiento | HU-26 |
| RF-27 | Devolver formulario para subsanación | EPIC-04: Seguimiento | HU-27 |
| RF-28 | Enviar alerta al supervisor CE | EPIC-04: Seguimiento | HU-28 |
| RF-29 | Generar informe de seguimiento | EPIC-04: Seguimiento | HU-29 |
| RF-30 | Generar corte de matrícula censal | EPIC-04: Seguimiento | HU-30 |
| RF-31 | Ver historial de gestiones (Técnico) | EPIC-04: Seguimiento | HU-31 |
| RF-32 | Acceder a expediente del CE | EPIC-05: Llenado censal | HU-32 |
| RF-33 | Ver censos disponibles según oferta | EPIC-05: Llenado censal | HU-33 |
| RF-34 | Completar formulario con datos precargados | EPIC-05: Llenado censal | HU-34 |
| RF-35 | Consultar instructivo del formulario | EPIC-05: Llenado censal | HU-35 |
| RF-36 | Ver estado del censo del CE | EPIC-05: Llenado censal | HU-36 |
| RF-37 | Enviar formulario censal completo | EPIC-05: Llenado censal | HU-37 |
| RF-38 | Recibir notificación de cambio de estado | EPIC-05: Llenado censal | HU-38 |
| RF-39 | Corregir y reenviar formulario devuelto | EPIC-05: Llenado censal | HU-39 |
| RF-40 | Ver historial de envíos (Director) | EPIC-05: Llenado censal | HU-40 |
| RF-41 | Iniciar sesión como Supervisor | EPIC-06: Supervisión | HU-41 |
| RF-42 | Ver censos aceptados de centros | EPIC-06: Supervisión | HU-42 |
| RF-43 | Recibir notificaciones de avance | EPIC-06: Supervisión | HU-43 |
