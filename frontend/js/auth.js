/**
 * SICEN — auth.js
 * Login con selector de rol visual + validación por correo/contraseña.
 */

(function () {
  'use strict';

  const ROLES = {
    jefatura: { email: 'jefatura@mep.go.cr', password: 'sicen2025', nombre: 'María Rodríguez',  rol: 'jefatura_dae', initials: 'MR', color: '#185FA5' },
    tecnico:  { email: 'tecnico@mep.go.cr',  password: 'sicen2025', nombre: 'Ana Lucía Vargas', rol: 'tecnico_dae',  initials: 'AV', color: '#0F6E56' },
    director: { email: 'director@mep.go.cr', password: 'sicen2025', nombre: 'Carlos Alvarado',  rol: 'director_ce', initials: 'CA', color: '#854F0B' },
  };

  const RUTAS = {
    jefatura_dae: 'pages/dashboard-jefatura.html',
    tecnico_dae:  'pages/dashboard-tecnico.html',
    director_ce:  'pages/dashboard-director.html',
  };

  function guardarSesion(data) {
    try { localStorage.setItem('sicen_sesion', JSON.stringify(data)); } catch (_) {}
  }
  function obtenerSesion() {
    try { return JSON.parse(localStorage.getItem('sicen_sesion')); } catch (_) { return null; }
  }
  function cerrarSesion() {
    try { localStorage.removeItem('sicen_sesion'); } catch (_) {}
    window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
  }

  if (window.location.pathname.includes('dashboard-')) {
    initDashboard();
  } else {
    initLogin();
  }

  /* ═══════ LOGIN ═══════ */
  function initLogin() {
    const sesion = obtenerSesion();
    if (sesion && RUTAS[sesion.rol]) { window.location.href = RUTAS[sesion.rol]; return; }

    const inputCorreo = document.getElementById('correo');
    const inputPwd    = document.getElementById('contrasena');
    const alertaEl    = document.getElementById('alertaError');
    const mensajeEl   = document.getElementById('mensajeError');
    const btnLogin    = document.getElementById('btnLogin');
    const btnOjo      = document.getElementById('btnOjo');
    const form        = document.getElementById('formLogin');

    /* Selector de rol — solo visual, sin auto-rellenar campos */
    function seleccionarRol(rol) {
      document.querySelectorAll('.role-option').forEach(function (item) {
        const activo = item.dataset.rol === rol;
        item.classList.toggle('active', activo);
        item.setAttribute('aria-checked', String(activo));
        const radio = item.querySelector('.role-option__radio');
        if (radio) {
          radio.innerHTML = activo
            ? '<svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2.3 2.3L7.5 2" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>'
            : '';
        }
        const icon = item.querySelector('.role-option__icon');
        if (icon) icon.style.background = activo ? 'var(--primary)' : '#f3f4f6';
      });
    }

    document.querySelectorAll('.role-option').forEach(function (el) {
      el.addEventListener('click', function () { seleccionarRol(el.dataset.rol); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); seleccionarRol(el.dataset.rol); }
      });
    });

    if (btnOjo && inputPwd) {
      btnOjo.addEventListener('click', function () {
        const ver = inputPwd.type === 'text';
        inputPwd.type = ver ? 'password' : 'text';
      });
    }

    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        ocultarError();

        const correo     = (inputCorreo.value || '').trim().toLowerCase();
        const contrasena = (inputPwd.value    || '').trim();
        if (!correo || !contrasena) { mostrarError('Completá todos los campos.'); return; }

        btnLogin.disabled    = true;
        btnLogin.textContent = 'Verificando…';

        /* 1. API backend */
        let loggedIn = false;
        try {
          const resp = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, contrasena }),
            signal: AbortSignal.timeout(5000),
          });
          const data = await resp.json();
          if (data.exito) {
            const u   = data.usuario;
            const col = { jefatura_dae:'#185FA5', tecnico_dae:'#0F6E56', director_ce:'#854F0B' }[u.rol] || '#185FA5';
            const ini = (u.nombre||'?').split(' ').map(p=>p[0]).join('').substring(0,2).toUpperCase();
            guardarSesion({ nombre: u.nombre, rol: u.rol, token: data.token, initials: ini, color: col });
            window.location.href = RUTAS[u.rol];
            loggedIn = true;
          }
        } catch (_) {}

        if (loggedIn) return;

        /* 2. Fallback demo */
        const demo = Object.values(ROLES).find(u => u.email === correo && u.password === contrasena);
        if (!demo) { mostrarError('Correo o contraseña incorrectos.'); resetBtn(); return; }

        guardarSesion({ nombre: demo.nombre, rol: demo.rol, token: null, initials: demo.initials, color: demo.color });
        window.location.href = RUTAS[demo.rol];
      });
    }

    function mostrarError(msg) {
      if (alertaEl && mensajeEl) { mensajeEl.textContent = msg; alertaEl.classList.add('visible'); }
    }
    function ocultarError() { if (alertaEl) alertaEl.classList.remove('visible'); }
    function resetBtn() {
      btnLogin.disabled = false;
      btnLogin.innerHTML = 'Ingresar al sistema <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7.5h9M8.5 3.5l4 4-4 4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
  }

  /* ═══════ DASHBOARDS ═══════ */
  function initDashboard() {
    const sesion = obtenerSesion();
    if (sesion) {
      document.querySelectorAll('[data-sesion-nombre]').forEach(el => el.textContent = sesion.nombre || '');
      document.querySelectorAll('[data-sesion-initials]').forEach(el => el.textContent = sesion.initials || '?');
      document.querySelectorAll('[data-sesion-avatar]').forEach(el => {
        if (sesion.color) el.style.background = sesion.color;
        el.textContent = sesion.initials || '?';
      });
    }
    document.querySelectorAll('[data-action="logout"], [data-action="cambiar-perfil"]').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); cerrarSesion(); });
    });
  }

  window.SICEN = { obtenerSesion, cerrarSesion };
})();
