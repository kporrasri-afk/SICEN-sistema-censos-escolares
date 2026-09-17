# Especificación de Requisitos de Software (ERS)
## SICEN — Sistema de Gestión de Censos Escolares

| Campo | Detalle |
|---|---|
| **Proyecto** | SOFT-11C1 Proyecto Integrador 1 |
| **Estudiante** | Krystell Porras Rivera |
| **Institución** | Universidad CENFOTEC |
| **Docente** | Verónica Mora Lezcano |


---

## 1. Descripción general del sistema

### Propósito

El sistema SICEN tiene como propósito modernizar y automatizar los procesos de levantamiento, registro, seguimiento y validación de información estadística de los centros educativos públicos y privados del país, actualmente gestionados de forma manual por el Ministerio de Educación Pública (MEP) mediante formularios de Excel y correo electrónico.

### Alcance

SICEN es una aplicación web que centraliza la gestión de censos escolares. Permitirá a la Dirección de Análisis Estadístico (DAE) del MEP crear y configurar formularios censales, asignar censos a centros educativos según su oferta académica, dar seguimiento al proceso de llenado y validación, y generar reportes de avance. Los centros educativos podrán completar y enviar sus censos desde la plataforma, y los supervisores podrán monitorear el estado de los centros a su cargo.

El sistema no incluye integración con firma digital, autenticación institucional externa del MEP, ni generación de manuales técnicos de usuario.

### Perfiles de usuario y actores

#### Jefatura de la DAE — Administrador general
Persona responsable de la gestión completa del sistema. Construye y administra los formularios censales, configura los censos, gestiona a los colaboradores y accede a reportes generales.

#### Técnico de la DAE — Colaborador de seguimiento
Funcionario de la DAE asignado a una región o circuito específico. Se encarga de revisar los formularios enviados por los centros educativos, aceptarlos o devolverlos para corrección, y generar informes de seguimiento.

#### Director del centro educativo (o encargado)
Persona responsable de un centro educativo. Completa y envía los formularios censales asignados a su institución, consulta instructivos y visualiza el estado de sus envíos.

#### Supervisor
Funcionario que supervisa un grupo de centros educativos. Accede al sistema con permisos de solo visualización y recibe alertas sobre el avance de los censos de los centros bajo su cargo.

### Suposiciones

- Todos los usuarios cuentan con acceso a Internet y a un dispositivo con navegador web moderno.
- Los centros educativos cuentan con al menos una persona designada para completar los formularios censales.
- Los datos de centros educativos (nombre, circuito, región, oferta educativa) son preexistentes y serán cargados en el sistema durante la configuración inicial.
- El MEP proporcionará la información necesaria para la configuración inicial del sistema.
- Los usuarios cuentan con una dirección de correo electrónico institucional para la autenticación.

### Dependencias

- Disponibilidad del servicio de MongoDB Atlas para el almacenamiento de datos.
- Disponibilidad de un servidor Node.js para el despliegue del backend.
- Acceso a Internet para todos los usuarios del sistema.

### Restricciones generales

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


### 3.2 Normativas y estándares

#### Convenciones de nomenclatura

- **Archivos y carpetas:** minúscula, palabras separadas por guiones, nomenclatura snake-case.
- **Variables y funciones:** camelCase.
- **Clases y modelos:** PascalCase.
- **Constantes:** UPPER SNAKE-CASE.
- **Idioma:** documentación en español. Código (variables, funciones, comentarios) en español, de forma consistente en todo el proyecto (frontend y backend).

#### Estrategia de branches

| Rama | Propósito |
|---|---|
| `main` | Versiones estables entregadas al cliente. Solo recibe merges en las semanas de entrega (semanas 5, 8, 10, 14). |
| `develop` | Rama de integración. Todas las features se fusionan aquí antes de pasar a `main`. |
| `feature/nombre-funcionalidad` | Desarrollo de una nueva funcionalidad. Ej: `feature/login-usuario` |
| `fix/descripcion-bug` | Corrección de un error específico. Ej: `fix/validacion-formulario` |
| `docs/descripcion` | Cambios exclusivos en documentación. Ej: `docs/actualizar-ers` |

- Nunca hacer push directo a `main`.
- Crear un branch por cada funcionalidad o corrección.
- Hacer merge a `develop` una vez que la funcionalidad esté completa y probada.

#### Tipos de commits

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

---


