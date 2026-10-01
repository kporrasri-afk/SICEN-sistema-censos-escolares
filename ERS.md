# Especificación de Requisitos de Software (ERS)
## SICEN — Sistema de Gestión de Censos Escolares

| Campo | Detalle |
|---|---|
| **Proyecto** | SOFT-11C1 Proyecto Integrador 1 |
| **Estudiante** | Krystell Porras Rivera |
| **Institución** | Universidad CENFOTEC |
| **Docente** | Verónica Mora Lezcano |
| **Período** | 2026-C3 |

---

## 1. Descripción general del sistema

### 1.1 Propósito

El sistema SICEN tiene como propósito modernizar y automatizar los procesos de levantamiento, registro, seguimiento y validación de información estadística de los centros educativos públicos y privados del país, actualmente gestionados de forma manual por el Ministerio de Educación Pública (MEP).

### 1.2 Alcance

SICEN es una aplicación web que centraliza la gestión de censos escolares. Permitirá a la DAE crear y configurar formularios censales, asignar censos a centros educativos, dar seguimiento al proceso de llenado y validación, y generar reportes de avance.

> **Nota de alcance (versión individual):** Los siguientes elementos han sido excluidos del alcance para esta versión de trabajo individual: personalización de apariencia de formularios, adjuntar y consultar instructivos, módulo de comunicados y alertas, historial de gestiones y el Módulo de Supervisión.

### 1.3 Perfiles de usuario y actores

#### Jefatura de la DAE — Administrador general
Responsable de la gestión completa del sistema. Construye y administra los formularios censales, configura los censos y gestiona a los colaboradores.

#### Técnico de la DAE — Colaborador de seguimiento
Funcionario asignado a una región o circuito. Revisa los formularios enviados, los acepta o devuelve para corrección y genera informes de seguimiento.

#### Director del centro educativo (o encargado)
Responsable de un centro educativo. Completa y envía los formularios censales asignados y visualiza el estado de sus envíos.

### 1.4 Suposiciones

- Todos los usuarios cuentan con acceso a Internet y a un dispositivo con navegador web moderno.
- Los centros educativos cuentan con al menos una persona designada para completar los formularios censales.
- Los datos de centros educativos (nombre, circuito, región, oferta educativa) son preexistentes y serán cargados en el sistema durante la configuración inicial.
- El MEP proporcionará la información necesaria para la configuración inicial del sistema.

### 1.5 Dependencias

- Disponibilidad del servicio de MongoDB Atlas para el almacenamiento de datos.
- Disponibilidad de un servidor Node.js para el despliegue del backend.
- Acceso a Internet para todos los usuarios del sistema.

### 1.6 Restricciones generales

- Los formularios censales únicamente admiten tres tipos de preguntas: selección única, selección múltiple y descripción.
- La documentación del proyecto debe estar redactada en español.
- El sistema debe funcionar correctamente en Chrome, Firefox y Edge en sus versiones más recientes.
- El sistema debe ser responsivo y adaptarse a dispositivos móviles, tabletas y computadoras de escritorio.
- El sistema debe cumplir con estándares de accesibilidad para personas con discapacidad visual (alto contraste y modo claro).

---

## 2. Requisitos funcionales

### Módulo 1: Autenticación y control de acceso

| ID | Descripción | Actor |
|---|---|---|
| RF-01 | El sistema debe contar con un mecanismo de autenticación que permita a los usuarios acceder a las funcionalidades correspondientes a su rol. | Todos |
| RF-02 | El sistema debe controlar el acceso a las funcionalidades disponibles según el rol asignado a cada usuario. | Todos |
| RF-03 | El sistema debe redirigir a cada usuario a su panel de trabajo correspondiente tras autenticarse exitosamente. | Todos |

> **Nota:** El método de autenticación específico (credenciales institucionales, proveedor de identidad u otro mecanismo) será definido por el cliente. No se asume el uso de contraseña como único método.

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
| RF-11 | El sistema debe permitir a la Jefatura DAE definir el flujo de aprobación para cada censo. | Jefatura DAE |

### Módulo 3: Administración de censos y colaboradores

| ID | Descripción | Actor |
|---|---|---|
| RF-12 | El sistema debe permitir registrar colaboradores de la DAE en el sistema. | Jefatura DAE |
| RF-13 | El sistema debe permitir asignar roles y permisos a los colaboradores por dirección regional o circuito. | Jefatura DAE |
| RF-14 | El sistema debe permitir configurar censos asociando formularios a modelos de oferta educativa específicos. | Jefatura DAE |
| RF-15 | El sistema debe permitir definir fechas de apertura y cierre para cada censo. | Jefatura DAE |
| RF-16 | El sistema debe permitir a la Jefatura DAE abrir un censo manualmente. | Jefatura DAE |
| RF-17 | El sistema debe permitir a la Jefatura DAE pausar un censo manualmente. | Jefatura DAE |
| RF-18 | El sistema debe permitir a la Jefatura DAE cerrar un censo manualmente. | Jefatura DAE |
| RF-19 | El sistema debe permitir a la Jefatura DAE acceder a visores y reportes generales del estado de los censos. | Jefatura DAE |

### Módulo 4: Seguimiento técnico

| ID | Descripción | Actor |
|---|---|---|
| RF-20 | El sistema debe permitir al Técnico DAE visualizar únicamente los centros educativos asignados según su configuración de perfil. | Técnico DAE |
| RF-21 | El sistema debe permitir al Técnico DAE revisar los formularios remitidos por los centros asignados. | Técnico DAE |
| RF-22 | El sistema debe permitir al Técnico DAE consultar el estado actual de cada formulario censal. | Técnico DAE |
| RF-23 | El sistema debe permitir al Técnico DAE aceptar formularios censales correctamente completados. | Técnico DAE |
| RF-24 | El sistema debe permitir al Técnico DAE devolver formularios para subsanación, registrando el motivo de la devolución. | Técnico DAE |
| RF-25 | El sistema debe permitir al Técnico DAE generar informes de seguimiento del avance censal. | Técnico DAE |
| RF-26 | El sistema debe permitir al Técnico DAE generar cortes de matrícula censal. | Técnico DAE |

### Módulo 5: Llenado censal

| ID | Descripción | Actor |
|---|---|---|
| RF-27 | El sistema debe permitir al Director del CE acceder al expediente de su centro educativo. | Director CE |
| RF-28 | El sistema debe mostrar al Director del CE los censos disponibles según la oferta educativa autorizada de su centro. | Director CE |
| RF-29 | El sistema debe permitir al Director del CE completar formularios censales con datos del centro precargados. | Director CE |
| RF-30 | El sistema debe mostrar al Director del CE el estado de su formulario censal conforme a las etapas del proceso definidas por el cliente: enviado, aceptado y devuelto para subsanación. | Director CE |
| RF-31 | El sistema debe permitir al Director del CE enviar el formulario censal completo. | Director CE |
| RF-32 | El sistema debe permitir al Director del CE corregir y reenviar formularios devueltos para subsanación. | Director CE |

> **Nota:** Los estados del formulario se basan en las etapas mencionadas explícitamente en el documento del cliente. No se incorporan estados adicionales que no hayan sido indicados por el cliente.

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

> Nota: Se permite el uso de React, Vue o Angular como framework adicional de frontend.

### 3.2 Normativas y estándares

#### Convenciones de nomenclatura

- **Archivos y carpetas:** minúscula, palabras separadas por guiones. ✅ `formulario-censal.js` ❌ `FormularioCensal.js`
- **Variables y funciones:** camelCase. ✅ `obtenerFormulario()` ❌ `ObtenerFormulario()`
- **Clases y modelos:** PascalCase. ✅ `FormularioCensal`
- **Constantes:** UPPER_SNAKE_CASE. ✅ `MAX_INTENTOS`
- **Idioma:** documentación en **español**. Código en **inglés**, de forma consistente en frontend y backend.

#### Estrategia de branches

| Rama | Propósito |
|---|---|
| `main` | Versiones estables entregadas al cliente. Solo merge en semanas de entrega. |
| `develop` | Rama de integración. Features se fusionan aquí antes de `main`. |
| `feature/nombre-funcionalidad` | Desarrollo de nueva funcionalidad. |
| `fix/descripcion-bug` | Corrección de errores. |
| `docs/descripcion` | Cambios exclusivos en documentación. |

**Reglas:** Nunca hacer push directo a `main`. Un branch por funcionalidad.

#### Tipos de commits

Formato: `tipo: descripción breve en minúscula`

| Tipo | Uso |
|---|---|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de error |
| `docs:` | Cambios en documentación |
| `chore:` | Configuración, dependencias |
| `refactor:` | Reestructuración sin cambiar funcionalidad |
| `style:` | Cambios de formato sin afectar lógica |
| `test:` | Pruebas |

---

## 4. Matriz de trazabilidad

| ID Req | Descripción corta | Épica Jira | Historia de usuario |
|---|---|---|---|
| RF-01 | Autenticación por rol | EPIC-01 | HU-01 |
| RF-02 | Control de acceso por rol | EPIC-01 | HU-02 |
| RF-03 | Redirección por rol al autenticarse | EPIC-01 | HU-03 |
| RF-04 | Crear formulario desde cero | EPIC-02 | HU-04 |
| RF-05 | Crear formulario desde plantilla | EPIC-02 | HU-05 |
| RF-06 | Editar formulario censal | EPIC-02 | HU-06 |
| RF-07 | Eliminar formulario censal | EPIC-02 | HU-07 |
| RF-08 | Agregar pregunta selección única | EPIC-02 | HU-08 |
| RF-09 | Agregar pregunta selección múltiple | EPIC-02 | HU-09 |
| RF-10 | Agregar pregunta descripción | EPIC-02 | HU-10 |
| RF-11 | Definir flujo de aprobación | EPIC-02 | HU-11 |
| RF-12 | Registrar colaboradores DAE | EPIC-03 | HU-12 |
| RF-13 | Asignar roles por región/circuito | EPIC-03 | HU-13 |
| RF-14 | Configurar censo por oferta educativa | EPIC-03 | HU-14 |
| RF-15 | Definir fechas apertura/cierre | EPIC-03 | HU-15 |
| RF-16 | Abrir censo manualmente | EPIC-03 | HU-16 |
| RF-17 | Pausar censo manualmente | EPIC-03 | HU-17 |
| RF-18 | Cerrar censo manualmente | EPIC-03 | HU-18 |
| RF-19 | Ver reportes generales | EPIC-03 | HU-19 |
| RF-20 | Ver solo centros asignados | EPIC-04 | HU-20 |
| RF-21 | Revisar formularios enviados | EPIC-04 | HU-21 |
| RF-22 | Consultar estado de formularios | EPIC-04 | HU-22 |
| RF-23 | Aceptar formulario censal | EPIC-04 | HU-23 |
| RF-24 | Devolver formulario con motivo | EPIC-04 | HU-24 |
| RF-25 | Generar informe de seguimiento | EPIC-04 | HU-25 |
| RF-26 | Generar corte de matrícula censal | EPIC-04 | HU-26 |
| RF-27 | Acceder al expediente del CE | EPIC-05 | HU-27 |
| RF-28 | Ver censos disponibles | EPIC-05 | HU-28 |
| RF-29 | Completar formulario con datos precargados | EPIC-05 | HU-29 |
| RF-30 | Ver estado del formulario (enviado/aceptado/devuelto) | EPIC-05 | HU-30 |
| RF-31 | Enviar formulario censal | EPIC-05 | HU-31 |
| RF-32 | Corregir y reenviar formulario devuelto | EPIC-05 | HU-32 |

