/* Funciones compartidas: base de datos, identificación del estudiante y enlaces del curso */
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

  /* ---------- identificación ---------- */
  const ID_KEY = 'qg_estudiante';
  /* Se comparte con los laboratorios virtuales, que guardan {est, nombre, curso} en 'labgases-id' */
  function quien(){
    const l = store.get('labgases-id');
    if (l && l.nombre && l.curso) return { estudiante_id: l.est || null, nombre: l.nombre, curso: l.curso };
    const q = store.get(ID_KEY); return q && q.nombre ? q : null;
  }
  function guardarQuien(q){ store.set(ID_KEY, q); store.set('labgases-id', { est: q.estudiante_id || null, nombre: q.nombre, curso: q.curso }); }
  function pintarQuien(){
    const w = $('#who'); if (!w) return;
    const q = quien();
    w.innerHTML = q ? 'Estudiante: <b>' + esc(q.nombre) + '</b> · ' + esc(q.curso) : 'Identifícate';
  }
  function gateHTML(){
    return '<div class="gate" id="gate" hidden><form class="box" id="gForm">' +
      '<p class="eyebrow">Química General · 10.°</p><h2>¿Quién eres?</h2>' +
      '<p class="note">Tu nombre queda con tus respuestas para que el profesor pueda darte realimentación. Te identificas una sola vez en este dispositivo.</p>' +
      '<label class="f">Curso<select id="gCurso" required><option value="">Cargando cursos…</option></select></label>' +
      '<label class="f" id="gListaL" hidden>Nombre<select id="gLista"></select></label>' +
      '<label class="f" id="gLibreCursoL" hidden>Escribe tu curso<input id="gLibreCurso" placeholder="Ej.: 10-1" maxlength="20" autocomplete="off"></label>' +
      '<label class="f" id="gLibreL" hidden>Nombre completo<input id="gLibre" placeholder="Apellidos y nombres" maxlength="120" autocomplete="name"></label>' +
      '<p class="note" id="gMsg" role="status"></p>' +
      '<div class="btnrow"><button class="btn pri" type="submit">Continuar</button><button class="btn" type="button" id="gCancel">Cancelar</button></div>' +
      '</form></div>';
  }
  let gateResolve = null;
  async function pedirIdentidad(obligatorio){
    if (!$('#gate')) document.body.insertAdjacentHTML('beforeend', gateHTML());
    const g = $('#gate'), sc = $('#gCurso'), msg = $('#gMsg');
    g.hidden = false; $('#gCancel').hidden = !!obligatorio;
    let cursos = [];
    try { cursos = (await rpc('cursos')) || []; } catch(e){ cursos = []; }
    cursos = cursos.map(c => typeof c === 'string' ? c : (c.cursos || Object.values(c)[0]));
    sc.innerHTML = '<option value="">Elige tu curso</option>' + cursos.map(c => '<option>' + esc(c) + '</option>').join('') + '<option value="__otro">Mi curso no aparece</option>';
    const libre = !cursos.length;
    if (libre){ sc.closest('label').hidden = true; sc.required = false; $('#gLibreCursoL').hidden = false; $('#gLibreL').hidden = false; }
    sc.onchange = async () => {
      const v = sc.value; $('#gListaL').hidden = true; $('#gLibreL').hidden = true; $('#gLibreCursoL').hidden = true;
      if (v === '__otro'){ $('#gLibreCursoL').hidden = false; $('#gLibreL').hidden = false; return; }
      if (!v) return;
      try {
        const l = await rpc('lista_curso', { p_curso: v });
        if (l && l.length){ $('#gLista').innerHTML = '<option value="">Elige tu nombre</option>' + l.map(x => '<option value="' + esc(x.id) + '">' + esc(x.etiqueta) + '</option>').join('') + '<option value="__libre">Mi nombre no aparece</option>'; $('#gListaL').hidden = false; }
        else $('#gLibreL').hidden = false;
      } catch(e){ $('#gLibreL').hidden = false; }
    };
    $('#gLista').onchange = () => { $('#gLibreL').hidden = $('#gLista').value !== '__libre'; };
    return new Promise(res => {
      gateResolve = res;
      $('#gCancel').onclick = () => { g.hidden = true; res(quien()); };
      $('#gForm').onsubmit = e => {
        e.preventDefault();
        let curso = sc.value, nombre = '', id = null;
        if (libre || curso === '__otro'){ curso = $('#gLibreCurso').value.trim(); }
        const lv = !$('#gListaL').hidden ? $('#gLista').value : '';
        if (lv && lv !== '__libre'){ id = lv; nombre = $('#gLista').selectedOptions[0].textContent; }
        else nombre = $('#gLibre').value.trim().replace(/\s+/g, ' ');
        if (!curso || !nombre || nombre.length < 5){ msg.textContent = 'Escribe tu curso y tu nombre completo.'; return; }
        const q = { estudiante_id: id, nombre, curso };
        const antes = quien(); guardarQuien(q); g.hidden = true; pintarQuien(); res(q);
        if (antes && claveDe(antes) !== claveDe(q)) dispatchEvent(new Event('qg:identidad'));
      };
    });
  }
  function claveDe(q){ const s = (q.estudiante_id || (q.curso + '|' + q.nombre)).toLowerCase(); let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  async function asegurarIdentidad(){ return quien() || await pedirIdentidad(true); }

  /* ---------- enlaces del curso ---------- */
  function enlaces(){
    document.querySelectorAll('[data-link]').forEach(a => {
      const u = C[a.dataset.link];
      if (u){ a.href = u; if (/^https?:|\.pdf/.test(u)){ a.target = '_blank'; a.rel = 'noopener'; } }
      else { a.removeAttribute('href'); a.classList.add('off'); a.setAttribute('aria-disabled','true'); a.title = 'Disponible pronto'; const s = a.querySelector('.lbl'); if (s) s.textContent = s.dataset.pronto || 'Disponible pronto'; }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    enlaces(); pintarQuien();
    const w = $('#who'); if (w) w.onclick = () => pedirIdentidad(false);
  });
  window.QG = { $, esc, store, uuid, rpc, quien, pedirIdentidad, asegurarIdentidad, pintarQuien, claveDe };
})();
