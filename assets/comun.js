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
    if (l && l.nombre && l.curso && l.nombre !== 'Estudiante anónimo') return { estudiante_id: l.est || null, nombre: l.nombre, curso: l.curso };
    const q = store.get(ID_KEY); return q && q.nombre ? q : (IDENTIFICAR ? null : ANONIMO);
  }
  function guardarQuien(q){ store.set(ID_KEY, q); store.set('labgases-id', { est: q.estudiante_id || null, nombre: q.nombre, curso: q.curso }); }
  function pintarQuien(){
    const w = $('#who'); if (!w) return;
    const q = quien();
    w.innerHTML = q ? '<span class="wl">Estudiante: </span><b>' + esc(q.nombre.split(' ').slice(0, 2).join(' ')) + '</b><span class="wc"> · ' + esc(q.curso) + '</span>' : 'Identifícate'; w.title = q ? q.nombre + ' · ' + q.curso + ' (cambiar)' : '';
  }
  function gateHTML(){
    return '<div class="gate" id="gate" hidden><form class="box" id="gForm">' +
      '<p class="eyebrow">Quimiverso · Química General</p><h2>¿Quién eres?</h2>' +
      '<p class="note">Tu nombre queda con tus respuestas para que el profesor pueda darte realimentación. Te identificas una sola vez en este dispositivo.</p>' +
      '<label class="f">Curso<select id="gCurso" required></select></label>' +
      '<label class="f" id="gListaL" hidden>Nombre<select id="gLista"></select></label>' +
      '<label class="f" id="gLibreL" hidden>Nombre completo<input id="gLibre" placeholder="Apellidos y nombres" maxlength="120" autocomplete="name"></label>' +
      '<p class="note" id="gMsg" role="status"></p>' +
      '<div class="btnrow"><button class="btn pri" type="submit">Continuar</button><button class="btn" type="button" id="gCancel">Cancelar</button></div>' +
      '</form></div>';
  }
  async function pedirIdentidad(obligatorio){
    if (!$('#gate')) document.body.insertAdjacentHTML('beforeend', gateHTML());
    const g = $('#gate'), sc = $('#gCurso'), sl = $('#gLista'), msg = $('#gMsg');
    const cursos = C.cursos || ['10-1','10-2','10-3','10-V','11-1','11-2','11-V'];
    g.hidden = false; $('#gCancel').hidden = !!obligatorio; msg.textContent = '';
    $('#gListaL').hidden = true; $('#gLibreL').hidden = true;
    sc.innerHTML = '<option value="">Elige tu curso</option>' + cursos.map(c => '<option>' + esc(c) + '</option>').join('');
    sc.onchange = async () => {
      const v = sc.value; $('#gListaL').hidden = true; $('#gLibreL').hidden = true; msg.textContent = '';
      if (!v) return;
      sl.innerHTML = '<option value="">Cargando la lista…</option>'; $('#gListaL').hidden = false;
      let l = [];
      try { l = (await rpc('lista_curso', { p_curso: v })) || []; } catch(e){ l = null; }
      if (sc.value !== v) return;
      if (l && l.length){
        sl.innerHTML = '<option value="">Elige tu nombre</option>' + l.map(x => '<option value="' + esc(x.id) + '">' + esc(x.etiqueta) + '</option>').join('') + '<option value="__libre">Mi nombre no aparece</option>';
      } else {
        $('#gListaL').hidden = true; $('#gLibreL').hidden = false;
        msg.textContent = l === null ? 'Sin conexión: escribe tu nombre completo.' : 'La lista de este curso aún no está cargada: escribe tu nombre completo.';
      }
    };
    sl.onchange = () => { $('#gLibreL').hidden = sl.value !== '__libre'; };
    return new Promise(res => {
      $('#gCancel').onclick = () => { g.hidden = true; res(quien()); };
      $('#gForm').onsubmit = e => {
        e.preventDefault();
        const curso = sc.value; let nombre = '', id = null;
        const lv = !$('#gListaL').hidden ? sl.value : '';
        if (lv && lv !== '__libre'){ id = lv; nombre = sl.selectedOptions[0].textContent; }
        else if (!$('#gLibreL').hidden) nombre = $('#gLibre').value.trim().replace(/\s+/g, ' ');
        if (!curso){ msg.textContent = 'Elige tu curso.'; return; }
        if (!nombre || nombre.length < 5){ msg.textContent = $('#gLibreL').hidden ? 'Elige tu nombre de la lista.' : 'Escribe tu nombre completo.'; return; }
        const q = { estudiante_id: id, nombre, curso };
        const antes = quien(); guardarQuien(q); g.hidden = true; pintarQuien(); res(q);
        if (antes && claveDe(antes) !== claveDe(q)) dispatchEvent(new Event('qg:identidad'));
      };
    });
  }
  function claveDe(q){ const s = (q.estudiante_id || (q.curso + '|' + q.nombre)).toLowerCase(); let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  /* Por ahora el sitio no pide identificación: las respuestas se guardan como anónimas.
     Para volver a pedir nombre, cambia IDENTIFICAR a true. */
  const IDENTIFICAR = false;
  const ANONIMO = { estudiante_id: null, nombre: 'Estudiante anónimo', curso: null };
  async function asegurarIdentidad(){ return quien() || (IDENTIFICAR ? await pedirIdentidad(true) : ANONIMO); }

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
