// Capa de Lógica — Controlador de Autenticación
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

// Genera el token JWT
const generarToken = (id, rol) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "8h",
  });
};

/**
 * POST /api/auth/login
 * Autentica al usuario y devuelve token + datos básicos
 */
const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Validar campos
    if (!correo || !contrasena) {
      return res.status(400).json({
        exito: false,
        mensaje: "Correo y contraseña son obligatorios",
      });
    }

    // Buscar usuario (incluir contraseña que por defecto no se devuelve)
    const usuario = await Usuario.findOne({ correo, activo: true }).select("+contrasena");
    if (!usuario) {
      return res.status(401).json({
        exito: false,
        mensaje: "Credenciales incorrectas",
      });
    }

    // Verificar contraseña
    const contrasenaValida = await usuario.verificarContrasena(contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({
        exito: false,
        mensaje: "Credenciales incorrectas",
      });
    }

    // Generar token
    const token = generarToken(usuario._id, usuario.rol);

    res.status(200).json({
      exito: true,
      token,
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
 * GET /api/auth/perfil
 * Devuelve datos del usuario autenticado (requiere token)
 */
const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    res.status(200).json({
      exito: true,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ exito: false, mensaje: "Error al obtener perfil" });
  }
};

module.exports = { login, perfil };
