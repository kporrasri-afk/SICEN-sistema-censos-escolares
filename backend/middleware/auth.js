// Capa de Lógica — Middleware de Autenticación y Autorización
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

/**
 * Verifica que el token JWT sea válido.
 * Agrega req.usuario con { id, rol } si es válido.
 */
const proteger = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        exito: false,
        mensaje: "Acceso denegado. Token no proporcionado.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      exito: false,
      mensaje: "Token inválido o expirado.",
    });
  }
};

/**
 * Restringe acceso a roles específicos.
 * Uso: router.get("/ruta", proteger, restringirA("jefatura_dae"), handler)
 */
const restringirA = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({
        exito: false,
        mensaje: "No tenés permiso para acceder a este recurso.",
      });
    }
    next();
  };
};

module.exports = { proteger, restringirA };
