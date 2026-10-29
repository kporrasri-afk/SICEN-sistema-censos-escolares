// Capa de Datos — Modelo de Usuario (MongoDB/Mongoose)
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

/**
 * Roles del sistema SICEN:
 * - jefatura_dae: Administrador, construye formularios y configura censos
 * - tecnico_dae:  Revisa formularios enviados, genera informes
 * - director_ce:  Completa y envía formularios censales
 */
const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Formato de correo inválido"],
    },
    contrasena: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [8, "Mínimo 8 caracteres"],
      select: false, // No se devuelve en consultas por defecto
    },
    rol: {
      type: String,
      enum: ["jefatura_dae", "tecnico_dae", "director_ce"],
      required: [true, "El rol es obligatorio"],
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt automáticos
  }
);

// Hash de contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contrasena")) return next();
  this.contrasena = await bcrypt.hash(this.contrasena, 12);
  next();
});

// Método para verificar contraseña
usuarioSchema.methods.verificarContrasena = async function (contrasenaIngresada) {
  return await bcrypt.compare(contrasenaIngresada, this.contrasena);
};

module.exports = mongoose.model("Usuario", usuarioSchema);
