// auth.js — Lógica de autenticación del cliente (ES6+)
"use strict";

const API_BASE = "/api";

// ── Utilidades ──────────────────────────────────────────────

/** Guarda el token y datos del usuario en sessionStorage */
const guardarSesion = (token, usuario) => {
  sessionStorage.setItem("sicen_token", token);
  sessionStorage.setItem("sicen_usuario", JSON.stringify(usuario));
};

/** Limpia la sesión y redirige al login */
const cerrarSesion = () => {
  sessionStorage.removeItem("sicen_token");
  sessionStorage.removeItem("sicen_usuario");
  window.location.href = "/index.html";
};

/** Devuelve el usuario guardado o null */
const obtenerUsuario = () => {
  const data = sessionStorage.getItem("sicen_usuario");
  return data ? JSON.parse(data) : null;
};

/** Devuelve el token guardado o null */
const obtenerToken = () => sessionStorage.getItem("sicen_token");

// ── Redirección según rol ───────────────────────────────────

const RUTAS_POR_ROL = {
  jefatura_dae: "/pages/dashboard-jefatura.html",
  tecnico_dae:  "/pages/dashboard-tecnico.html",
  director_ce:  "/pages/dashboard-director.html",
};

const redirigirPorRol = (rol) => {
  const ruta = RUTAS_POR_ROL[rol];
  if (ruta) {
    window.location.href = ruta;
  } else {
    console.error("Rol desconocido:", rol);
  }
};

// ── Formulario de login ─────────────────────────────────────

const formLogin = document.getElementById("formLogin");

if (formLogin) {
  // Si ya hay sesión activa, redirigir directamente
  const usuario = obtenerUsuario();
  if (usuario && obtenerToken()) {
    redirigirPorRol(usuario.rol);
  }

  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo    = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value;
    const btnLogin  = document.getElementById("btnLogin");
    const alerta    = document.getElementById("alertaError");
    const msgError  = document.getElementById("mensajeError");

    // Ocultar errores previos
    alerta.classList.remove("visible");

    // Validación básica en cliente
    if (!correo || !contrasena) {
      msgError.textContent = "Completá todos los campos.";
      alerta.classList.add("visible");
      return;
    }

    // Estado de carga
    btnLogin.disabled = true;
    btnLogin.textContent = "Ingresando…";

    try {
      const respuesta = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok || !datos.exito) {
        throw new Error(datos.mensaje || "Error al iniciar sesión.");
      }

      // Guardar sesión y redirigir
      guardarSesion(datos.token, datos.usuario);
      redirigirPorRol(datos.usuario.rol);

    } catch (error) {
      msgError.textContent = error.message;
      alerta.classList.add("visible");
      btnLogin.disabled = false;
      btnLogin.textContent = "Ingresar";
    }
  });
}

// Exportar utilidades para uso en otras páginas
window.SICEN = { obtenerUsuario, obtenerToken, cerrarSesion };
