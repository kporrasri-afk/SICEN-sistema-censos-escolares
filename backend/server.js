// Capa de Presentación — Servidor Express (SICEN)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { conectarDB, estaConectada } = require("./config/database");

// Importar rutas
const authRoutes = require("./routes/authRoutes");

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// ── Rutas de la API ─────────────────────────────────────────
app.use("/api/auth", authRoutes);

// Ruta de salud del servidor
app.get("/api/status", (req, res) => {
  res.json({
    sistema: "SICEN",
    version: "1.0.0",
    estado: "operativo",
    modoDemo: !estaConectada(),
    db: estaConectada() ? "conectada" : "no disponible",
    timestamp: new Date().toISOString(),
  });
});

// Redirigir cualquier otra ruta al frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ── Iniciar servidor ────────────────────────────────────────
const PORT = process.env.PORT || 3000;

// El servidor arranca SIEMPRE; MongoDB se intenta en paralelo
app.listen(PORT, () => {
  console.log(`🚀 SICEN corriendo en http://localhost:${PORT}`);
  console.log(`   Ambiente: ${process.env.NODE_ENV || "development"}`);
});

// Intentar conectar a MongoDB sin bloquear
conectarDB();
