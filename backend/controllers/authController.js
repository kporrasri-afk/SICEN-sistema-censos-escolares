// Capa de Lógica — Controlador de Autenticación
const jwt = require("jsonwebtoken");
const { estaConectada } = require("../config/database");

// Usuarios demo (solo activos cuando MongoDB no está disponible)
const USUARIOS_DEMO = [
  { _id: "demo-001", nombre: "María Rodríguez",  correo: "jefatura@mep.go.cr", contrasena: "sicen2025", rol: "jefatura_dae" },
  { _id: "demo-002", nombre: "Ana Lucía Vargas", correo: "tecnico@mep.go.cr",  contrasena: "sicen2025", rol: "tecnico_dae"  },
  { _id: "demo-003", nombre: "Carlos Alvarado",  correo: "director@mep.go.cr", contrasena: "sicen2025", rol: "director_ce"  },
];

// Genera el token JWT
const generarToken = (id, rol) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });
};

/**
 * POST /api/auth/login
 * Autentica al usuario (real en MongoDB, o demo si DB no disponible)
 */
const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({
        exito: false,
        mensaje: "Correo y contraseña son obligatorios",
      });
    }

    let usuario = null;

    if (estaConectada()) {
      // ── Modo real: buscar en MongoDB ────────────────────────
      const Usuario = require("../models/Usuario");
      const doc = await Usuario.findOne({ correo: correo.toLowerCase(), activo: true }).select("+contrasena");
      if (doc) {
        const valida = await doc.verificarContrasena(contrasena);
        if (valida) {
          usuario = { _id: doc._id, nombre: doc.nombre, correo: doc.correo, rol: doc.rol };
        }
      }
    } else {
      // ── Modo demo: validar contra lista local ───────────────
      const demo = USUARIOS_DEMO.find(
        u => u.correo === correo.toLowerCase() && u.contrasena === contrasena
      );
      if (demo) {
        usuario = { _id: demo._id, nombre: demo.nombre, correo: demo.correo, rol: demo.rol };
      }
    }

    if (!usuario) {
      return res.status(401).json({
        exito: false,
        mensaje: "Credenciales incorrectas",
      });
    }

    const token = generarToken(usuario._id, usuario.rol);

    res.status(200).json({
      exito: true,
      token,
      modoDemo: !estaConectada(),
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      exito: false,
      mensaje: "Error interno del servidor",
    });
  }
};

/**
 * GET /api/auth/perfil (requiere token JWT)
 */
const perfil = async (req, res) => {
  try {
    if (estaConectada()) {
      const Usuario = require("../models/Usuario");
      const usuario = await Usuario.findById(req.usuario.id);
      if (!usuario) return res.status(404).json({ exito: false, mensaje: "Usuario no encontrado" });
      return res.status(200).json({
        exito: true,
        usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol },
      });
    }

    // Modo demo
    const demo = USUARIOS_DEMO.find(u => u._id === req.usuario.id);
    res.status(200).json({
      exito: true,
      modoDemo: true,
      usuario: demo
        ? { id: demo._id, nombre: demo.nombre, correo: demo.correo, rol: demo.rol }
        : { id: req.usuario.id, rol: req.usuario.rol },
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener perfil" });
  }
};

module.exports = { login, perfil };
