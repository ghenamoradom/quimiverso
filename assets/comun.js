/* Funciones compartidas: base de datos, sesión del estudiante y enlaces del curso.
   Las páginas que no requieren sesión definen window.QV_PUBLICA = true antes de cargar este archivo. */
(function(){
  const C = window.CURSO || {}, S = window.SUPABASE || {};
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const store = {
    get(k){ try { return JSON.parse(localStorage.getItem(k)); } catch(e){ return null; } },
    set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
    del(k){ try { localStorage.removeItem(k); } catch(e){} }
  };
  function uuid(){
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random()*16|0; return (c === 'x' ? r : (r&3|8)).toString(16); });
  }
  async function rpc(fn, args){
    let r;
    try {
      r = await fetch(S.url + '/rest/v1/rpc/' + fn, { method:'POST',
        headers:{ apikey:S.key, Authorization:'Bearer ' + S.key, 'Content-Type':'application/json' },
        body: JSON.stringify(args || {}) });
    } catch(e){ const err = new Error('sin_conexion'); err.code = 'red'; throw err; }
    const t = await r.text();
    if (!r.ok){ let m = ''; try { m = JSON.parse(t).message || ''; } catch(e){} const err = new Error(m || ('HTTP ' + r.status)); err.code = m || 'http'; throw err; }
    return t ? JSON.parse(t) : null;
  }

  /* ---------- sesión ---------- */
  const SES = 'qv_sesion';
  const sesion = () => { const s = store.get(SES); return s && s.token ? s : null; };
  function guardarSesion(s){
    store.set(SES, s);
    // los laboratorios virtuales registran al estudiante con esta clave
    store.set('labgases-id', { est: s.id, nombre: s.nombre, curso: s.curso });
  }
  function borrarSesion(){ store.del(SES); store.del('labgases-id'); }
  const aqui = () => location.pathname.split('/').pop() + location.search + location.hash;
  function irALogin(){ location.replace('login.html?next=' + encodeURIComponent(aqui() || 'temas.html')); }
  async function salir(){
    const s = sesion(); borrarSesion();
    try { if (s) await rpc('salir', { p_token: s.token }); } catch(e){}
    location.href = './';
  }
  const corto = n => String(n || '').split(' ').filter(Boolean).slice(-2).map(w => w[0] + w.slice(1).toLowerCase()).join(' ');
  function pintarUsuario(){
    const el = $('#user'), s = sesion(); if (!el || !s) return;
    el.innerHTML = '<span class="uname" title="' + esc(s.nombre + ' · ' + s.curso) + '"><b>' + esc(corto(s.nombre) || s.nombre) + '</b><span class="ucur"> · ' + esc(s.curso) + '</span></span><button type="button" class="btn sm" id="bSalir">Salir</button>';
    $('#bSalir').onclick = salir;
  }
  // Guardia: sin sesión no se ve la página
  if (!window.QV_PUBLICA && !sesion()){ irALogin(); }
  // Comprueba en segundo plano que la sesión siga vigente
  async function verificar(){
    const s = sesion(); if (!s) return;
    try { const r = await rpc('sesion_info', { p_token: s.token }); if (!r){ borrarSesion(); if (!window.QV_PUBLICA) irALogin(); } }
    catch(e){ /* sin conexión: se deja seguir */ }
  }
  // Compatibilidad con reto y casos
  function quien(){ const s = sesion(); return s ? { estudiante_id: s.id, nombre: s.nombre, curso: s.curso } : null; }
  async function asegurarIdentidad(){ const q = quien(); if (!q){ irALogin(); return new Promise(() => {}); } return q; }
  function claveDe(q){ const s = String(q.estudiante_id || (q.curso + '|' + q.nombre)).toLowerCase(); let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }

  /* ---------- progreso ---------- */
  async function progreso(){
    const s = sesion(); if (!s) return null;
    const r = await rpc('progreso_mio', { p_token: s.token });
    if (r && r.error === 'sesion'){ borrarSesion(); irALogin(); return null; }
    return r;
  }
  async function marcar(act){
    const s = sesion(); if (!s) return null;
    const r = await rpc('progreso_marcar', { p_token: s.token, p_actividad: act });
    if (r && r.error === 'sesion'){ borrarSesion(); irALogin(); return null; }
    return r;
  }

  /* ---------- enlaces del curso ---------- */
  function enlaces(root){
    (root || document).querySelectorAll('[data-link]').forEach(a => {
      const u = C[a.dataset.link];
      if (u){ a.href = u; if (/^https?:|\.pdf/.test(u)){ a.target = '_blank'; a.rel = 'noopener'; } }
      else { a.removeAttribute('href'); a.classList.add('off'); a.setAttribute('aria-disabled','true'); a.title = 'Disponible pronto'; const s = a.querySelector('.lbl'); if (s) s.textContent = s.dataset.pronto || 'Disponible pronto'; }
    });
  }

  document.addEventListener('DOMContentLoaded', () => { enlaces(); pintarUsuario(); verificar(); });
  window.QG = { $, esc, store, uuid, rpc, sesion, guardarSesion, borrarSesion, salir, quien, asegurarIdentidad, claveDe, progreso, marcar, enlaces, corto };
})();
