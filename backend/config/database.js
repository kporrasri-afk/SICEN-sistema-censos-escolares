// Capa de Datos — Conexión a MongoDB Atlas
const mongoose = require("mongoose");

// Estado global de la conexión
let dbConectada = false;

const conectarDB = async () => {
  try {
    const opciones = {
      serverSelectionTimeoutMS: 8000,
      family: 4, // Forzar IPv4 (evita problemas de SRV en algunas redes)
    };
    const conn = await mongoose.connect(process.env.MONGO_URI, opciones);
    dbConectada = true;
    console.log(`✅ MongoDB Atlas conectado: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB no disponible: ${error.message}`);
    console.warn("   El servidor arranca en MODO DEMO (autenticación local).");
    // NO process.exit(1) — el servidor sigue funcionando
  }
};

const estaConectada = () => dbConectada;

module.exports = { conectarDB, estaConectada };
