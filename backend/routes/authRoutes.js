// Capa de Presentación (API) — Rutas de Autenticación
const express = require("express");
const { login, perfil } = require("../controllers/authController");
const { proteger } = require("../middleware/auth");

const router = express.Router();

// POST /api/auth/login
router.post("/login", login);

// GET /api/auth/perfil  (requiere token)
router.get("/perfil", proteger, perfil);

module.exports = router;
