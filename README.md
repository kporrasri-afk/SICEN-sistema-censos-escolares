# SICEN — Sistema de Gestión de Censos Escolares

Sistema web para automatizar y centralizar el levantamiento, registro, seguimiento y validación de datos estadísticos de centros educativos del **Ministerio de Educación Pública (MEP)**.

**Curso:** SOFT-11C1 · Proyecto Integrador 1 · CENFOTEC  
**Estudiante:** Krystell Porras Rivera  
**Periodo:** 2026-C3

---

## Arquitectura

```
SICEN/
├── frontend/           # Capa de Presentación
│   ├── index.html      # Login
│   ├── css/styles.css  # Estilos globales (WCAG 2.1 AA)
│   ├── js/auth.js      # Lógica de autenticación cliente
│   └── pages/          # Dashboards por rol
│       ├── dashboard-jefatura.html
│       ├── dashboard-tecnico.html
│       └── dashboard-director.html
│
└── backend/            # Capa de Lógica + Datos
    ├── server.js       # Servidor Express
    ├── config/
    │   └── database.js # Conexión MongoDB Atlas
    ├── models/
    │   └── Usuario.js  # Modelo Mongoose
    ├── controllers/
    │   └── authController.js
    ├── routes/
    │   └── authRoutes.js
    └── middleware/
        └── auth.js     # JWT + control de roles
```

**Patrón:** MVC · **Arquitectura:** 3 capas (Presentación / Lógica / Datos)

---

## Stack tecnológico

| Capa        | Tecnología            |
|-------------|----------------------|
| Frontend    | HTML5, CSS3, JS ES6+, Bootstrap 5.3 |
| Backend     | Node.js, Express.js  |
| Base de datos | MongoDB Atlas + Mongoose |
| Auth        | JWT (jsonwebtoken) + bcryptjs |

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/kporrasri-afk/SICEN-sistema-censos-escolares.git
cd SICEN-sistema-censos-escolares

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu MONGO_URI y JWT_SECRET

# 4. Iniciar el servidor
npm run dev      # Desarrollo (nodemon)
npm start        # Producción
```

La aplicación queda disponible en `http://localhost:3000`

---

## Roles del sistema

| Rol           | Descripción |
|---------------|-------------|
| `jefatura_dae`  | Administrador general: crea formularios y configura censos |
| `tecnico_dae`   | Revisa formularios enviados, acepta o devuelve con comentario |
| `director_ce`   | Completa y envía formularios censales de su centro |

---

## Estrategia de ramas

| Rama        | Uso |
|-------------|-----|
| `main`      | Versiones estables (entrega Semana 14) |
| `develop`   | Integración de funcionalidades activas |
| `feature/*` | Nuevas funcionalidades |
| `fix/*`     | Corrección de errores |
| `docs/*`    | Documentación |

---

## Endpoints API

```
POST /api/auth/login    → Autenticación, devuelve token JWT
GET  /api/auth/perfil   → Datos del usuario autenticado (requiere Bearer token)
GET  /api/status        → Estado del servidor
```

---

## Proyecto en Jira

[https://ucenfotec-team-ygprlro7.atlassian.net/jira/software/projects/SIC/boards/69/backlog](https://ucenfotec-team-ygprlro7.atlassian.net/jira/software/projects/SIC/boards/69/backlog)
