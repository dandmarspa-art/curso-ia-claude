/* =========================================================
   Curso de IA con Claude — lógica de la página
   ========================================================= */
(function () {
  const C = window.CURSO;
  const L = C.lecciones;
  const main = document.getElementById('contenido');
  const root = document.documentElement;

  /* ---------- Guardar progreso (en este navegador) ---------- */
  const guardado = {
    leer(clave, porDefecto) {
      try { const v = localStorage.getItem('cursoia:' + clave); return v === null ? porDefecto : JSON.parse(v); }
      catch (e) { return porDefecto; }
    },
    escribir(clave, valor) {
      try { localStorage.setItem('cursoia:' + clave, JSON.stringify(valor)); } catch (e) { /* sin almacenamiento */ }
    },
  };
  const hechas = () => guardado.leer('hechas', []);
  const marcarHecha = (i) => { const h = hechas(); if (!h.includes(i)) { h.push(i); guardado.escribir('hechas', h); } };

  /* ---------- Ajustes: tamaño de letra, colores, voz ---------- */
  let escala = guardado.leer('escala', 1);
  const temas = ['auto', 'light', 'dark', 'contraste'];
  const nombresTema = { auto: 'Automático', light: 'Claro', dark: 'Oscuro', contraste: 'Alto contraste' };
  let tema = guardado.leer('tema', 'auto');
  let vozLenta = guardado.leer('vozLenta', false);

  function aplicarAjustes() {
    root.style.setProperty('--escala', escala);
    if (tema === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', tema);
    document.getElementById('btn-tema').title = 'Colores: ' + nombresTema[tema];
    document.getElementById('btn-velocidad').setAttribute('aria-pressed', vozLenta ? 'true' : 'false');
  }
  document.getElementById('btn-mas').onclick = () => { escala = Math.min(1.6, +(escala + 0.1).toFixed(1)); guardado.escribir('escala', escala); aplicarAjustes(); };
  document.getElementById('btn-menos').onclick = () => { escala = Math.max(0.8, +(escala - 0.1).toFixed(1)); guardado.escribir('escala', escala); aplicarAjustes(); };
  document.getElementById('btn-tema').onclick = () => { tema = temas[(temas.indexOf(tema) + 1) % temas.length]; guardado.escribir('tema', tema); aplicarAjustes(); };
  document.getElementById('btn-velocidad').onclick = () => { vozLenta = !vozLenta; guardado.escribir('vozLenta', vozLenta); aplicarAjustes(); };
  document.getElementById('btn-callar').onclick = () => callar();
  document.getElementById('btn-inicio').onclick = () => { location.hash = '#/'; };
  aplicarAjustes();

  /* ---------- Leer en voz alta ---------- */
  const hayVoz = 'speechSynthesis' in window;
  let voces = [];
  let botonHablando = null;
  function cargarVoces() { if (hayVoz) voces = speechSynthesis.getVoices(); }
  if (hayVoz) { cargarVoces(); speechSynthesis.onvoiceschanged = cargarVoces; }

  function elegirVoz() {
    const es = voces.filter(v => /^es/i.test(v.lang));
    // Preferimos voces latinoamericanas y "naturales" (Edge tiene muy buenas)
    return es.find(v => /natural|online/i.test(v.name) && /(MX|US|419|AR|CO|CL)/i.test(v.lang))
      || es.find(v => /(MX|US|419|AR|CO|CL)/i.test(v.lang))
      || es.find(v => /natural|online/i.test(v.name))
      || es[0] || null;
  }
  function limpiarTexto(el) {
    const copia = el.cloneNode(true);
    copia.querySelectorAll('button, .escuchar, .no-leer, textarea, input, .botones').forEach(n => n.remove());
    return copia.innerText
      .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}]/gu, '')
      .replace(/⊞/g, '')
      .replace(/\s+\n/g, '\n')
      .trim();
  }
  function callar() {
    if (hayVoz) speechSynthesis.cancel();
    if (botonHablando) {
      botonHablando.classList.remove('hablando');
      botonHablando.textContent = botonHablando.dataset.original;
      if (botonHablando.classList.contains('escuchar')) botonHablando.setAttribute('aria-label', 'Escuchar este cuadro');
      else botonHablando.removeAttribute('aria-label');
    }
    botonHablando = null;
  }
  function hablar(texto, boton) {
    if (!hayVoz) { alertaSuave('Tu navegador no puede leer en voz alta. Prueba con Microsoft Edge o Google Chrome.'); return; }
    const mismo = boton && boton === botonHablando;
    callar();
    if (mismo) return; // segundo toque = detener
    // Partimos el texto en frases: los navegadores cortan textos muy largos
    const frases = texto.split(/(?<=[.!?:;])\s+|\n+/).map(f => f.trim()).filter(Boolean);
    const voz = elegirVoz();
    botonHablando = boton || null;
    if (boton) {
      boton.dataset.original = boton.textContent;
      boton.classList.add('hablando');
      boton.textContent = boton.classList.contains('escuchar') ? '⏹' : '⏹ Detener lectura';
      boton.setAttribute('aria-label', 'Detener');
    }
    frases.forEach((f, i) => {
      const u = new SpeechSynthesisUtterance(f);
      u.lang = voz ? voz.lang : 'es-MX';
      if (voz) u.voice = voz;
      u.rate = vozLenta ? 0.75 : 0.95;
      if (i === frases.length - 1) u.onend = () => { if (botonHablando === boton) callar(); };
      speechSynthesis.speak(u);
    });
  }

  /* ---------- Copiar al portapapeles ---------- */
  async function copiar(texto) {
    try { await navigator.clipboard.writeText(texto); return true; }
    catch (e) {
      const ta = document.createElement('textarea');
      ta.value = texto; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand('copy'); } catch (_) { /* nada */ }
      ta.remove(); return ok;
    }
  }

  function alertaSuave(msj) {
    const d = document.createElement('div');
    d.className = 'caja ojo'; d.setAttribute('role', 'status'); d.textContent = msj;
    main.prepend(d); setTimeout(() => d.remove(), 6000);
  }

  /* ---------- Confeti ---------- */
  function confeti() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cosas = ['🎉', '⭐', '🎨', '🧡', '✨', '🏆', '🎊'];
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.className = 'confeti';
      s.textContent = cosas[i % cosas.length];
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDelay = Math.random() * 0.8 + 's';
      s.style.fontSize = 1.4 + Math.random() * 1.6 + 'rem';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 3800);
    }
  }

  /* ---------- Mejorar el contenido: botones de escuchar y de copiar ---------- */
  function mejorar(contenedor) {
    contenedor.querySelectorAll('.bloque').forEach(b => {
      const btn = document.createElement('button');
      btn.className = 'escuchar'; btn.type = 'button'; btn.textContent = '🔊';
      btn.setAttribute('aria-label', 'Escuchar este cuadro'); btn.title = 'Escuchar este cuadro';
      btn.onclick = () => hablar(limpiarTexto(b), btn);
      b.prepend(btn);
    });
    contenedor.querySelectorAll('.prompt').forEach(p => {
      const texto = p.textContent.trim();
      p.innerHTML = '';
      const t = document.createElement('span'); t.className = 'texto-prompt'; t.textContent = texto;
      const botones = document.createElement('div'); botones.className = 'botones';
      const aviso = document.createElement('span'); aviso.className = 'aviso-copiado'; aviso.setAttribute('role', 'status');
      const abrir = document.createElement('a');
      abrir.className = 'boton'; abrir.target = '_blank'; abrir.rel = 'noopener';
      abrir.href = 'https://claude.ai/new?q=' + encodeURIComponent(texto);
      abrir.innerHTML = '🚀 Abrir en Claude';
      abrir.onclick = () => { copiar(texto); aviso.textContent = '✅ Se abrió Claude. Si la frase no aparece, pégala con Ctrl + V.'; };
      const cp = document.createElement('button');
      cp.className = 'boton secundario'; cp.type = 'button'; cp.innerHTML = '📋 Copiar';
      cp.onclick = async () => {
        const ok = await copiar(texto);
        aviso.textContent = ok ? '✅ ¡Copiado! Ahora ve a Claude y pega con Ctrl + V.' : '😕 No se pudo copiar. Usa el botón "Abrir en Claude".';
      };
      botones.append(abrir, cp);
      p.append(t, botones, aviso);
    });
    contenedor.querySelectorAll('.checklist[data-clave]').forEach(lista => {
      const clave = lista.dataset.clave;
      const estado = guardado.leer(clave, []);
      lista.querySelectorAll('input[type=checkbox]').forEach((cb, i) => {
        cb.checked = !!estado[i];
        cb.onchange = () => { const e = guardado.leer(clave, []); e[i] = cb.checked; guardado.escribir(clave, e); };
      });
    });
  }

  /* ---------- Pantalla: inicio ---------- */
  function vistaInicio() {
    const h = hechas();
    const pct = Math.round((h.length / L.length) * 100);
    const siguiente = L.findIndex((_, i) => !h.includes(i));
    let etapa = '';
    const tarjetas = L.map((l, i) => {
      let cab = '';
      if (l.etapa !== etapa) { etapa = l.etapa; cab = `<h2 class="etapa">${etapa}</h2>`; }
      const hecha = h.includes(i);
      const clase = hecha ? 'hecha' : (i === siguiente ? 'siguiente' : '');
      return `${cab}<a class="tarjeta-nivel ${clase}" href="#/leccion/${i}">
        <span class="num" aria-hidden="true">${l.emoji}</span>
        <span class="info"><span class="nivel">Nivel ${l.nivel}</span><span class="titulo">${l.titulo}</span><span class="meta">⏱️ ${l.minutos} minutos más o menos</span></span>
        <span class="estado" aria-label="${hecha ? 'Completada' : 'Pendiente'}">${hecha ? '⭐' : (i === siguiente ? '👉' : '')}</span>
      </a>`;
    }).join('');

    const textoBoton = h.length === 0 ? '▶️ ¡Empezar el curso!' : (siguiente === -1 ? '🎓 Ver mi diploma' : '▶️ Continuar donde quedé');
    const destino = siguiente === -1 ? L.length - 1 : siguiente;

    main.innerHTML = `
      <section class="portada">
        <div class="gran-emoji" aria-hidden="true">🎙️🧡🎨</div>
        <h1>Aprende IA con Claude</h1>
        <p class="sub">Un curso desde <strong>nivel 0</strong> hasta <strong>nivel 100</strong>. Paso a paso, con calma, y <strong>usando tu voz</strong>.</p>
        <a class="boton" href="#/leccion/${destino}">${textoBoton}</a>
        <div class="progreso" aria-label="Progreso del curso">
          <div class="riel"><div class="lleno" style="width:${pct}%"></div></div>
          <div class="etiqueta">${pct === 100 ? '🏆 ¡Curso completado!' : `Llevas ${h.length} de ${L.length} lecciones ⭐`}</div>
        </div>
      </section>

      <h2>🧭 Cómo usar este curso</h2>
      <div class="instrucciones">
        <div class="instr"><span class="ico">🔊</span><p>Toca <strong>🔊</strong> en cualquier cuadro para <strong>escucharlo</strong>.</p></div>
        <div class="instr"><span class="ico">🚀</span><p>Los botones <strong>"Abrir en Claude"</strong> escriben las frases por ti.</p></div>
        <div class="instr"><span class="ico">🔠</span><p>Usa <strong>A+</strong> y <strong>A−</strong> arriba para cambiar el tamaño de la letra.</p></div>
        <div class="instr"><span class="ico">🐢</span><p>Ve a tu ritmo. <strong>Una lección por día</strong> está perfecto.</p></div>
      </div>

      <h2>🗺️ El camino</h2>
      <div class="mapa">${tarjetas}</div>

      <h2 class="etapa">🧰 Ayudas</h2>
      <div class="extras">
        <a class="extra" href="#/frases"><span class="ico">💬</span><strong>Frases listas</strong><span>Frases para copiar y usar con Claude</span></a>
        <a class="extra" href="#/diccionario"><span class="ico">📖</span><strong>Diccionario</strong><span>Palabras nuevas explicadas fácil</span></a>
        <a class="extra" href="#/guia"><span class="ico">🤝</span><strong>Guía del acompañante</strong><span>Para quien te ayuda a aprender</span></a>
      </div>
    `;
    mejorar(main);
  }

  /* ---------- Pantalla: lección ---------- */
  function vistaLeccion(i) {
    const l = L[i];
    if (!l) { location.hash = '#/'; return; }
    const claveMision = 'mision-' + i;
    const mision = l.mision.map(m => `<li><label><input type="checkbox"><span>${m}</span></label></li>`).join('');
    const yaHecha = hechas().includes(i);

    main.innerHTML = `
      <div class="migas"><a class="boton secundario" href="#/">← Volver al mapa</a></div>
      <header class="cabecera-leccion">
        <div class="emoji" aria-hidden="true">${l.emoji}</div>
        <div class="nivel">Nivel ${l.nivel} · Lección ${i + 1} de ${L.length}</div>
        <h1>${l.titulo}</h1>
        <div class="meta">⏱️ ${l.minutos} minutos más o menos</div>
        <div class="acciones">
          <button class="boton" id="leer-todo" type="button">🔊 Escuchar toda la lección</button>
        </div>
        <div class="aprenderas"><h2>🎯 Vas a aprender</h2><ul>${l.aprenderas.map(a => `<li>${a}</li>`).join('')}</ul></div>
      </header>

      <div id="cuerpo">${l.html}</div>

      <section class="bloque mision">
        <h2>🏅 Tu misión</h2>
        <p>Marca cada cosa cuando la hagas. ¡No tiene que ser todo en un día!</p>
        <ul class="checklist" data-clave="${claveMision}">${mision}</ul>
      </section>

      <div class="final-leccion">
        <button class="boton verde" id="logrado" type="button">${yaHecha ? '⭐ ¡Lección completada! (celebrar otra vez)' : '🎉 ¡Lo logré!'}</button>
      </div>

      <nav class="navegacion" aria-label="Cambiar de lección">
        ${i > 0 ? `<a class="boton secundario" href="#/leccion/${i - 1}">⬅️ Anterior</a>` : '<span></span>'}
        ${i < L.length - 1 ? `<a class="boton" href="#/leccion/${i + 1}">Siguiente ➡️</a>` : `<a class="boton" href="#/">🏠 Volver al mapa</a>`}
      </nav>
      <p class="pista-teclas">💡 También puedes usar las flechas <kbd>←</kbd> <kbd>→</kbd> del teclado para cambiar de lección.</p>
    `;
    mejorar(main);

    const leer = document.getElementById('leer-todo');
    leer.onclick = () => {
      const partes = [l.titulo, 'Vas a aprender: ' + l.aprenderas.join('. ')];
      main.querySelectorAll('#cuerpo .bloque').forEach(b => partes.push(limpiarTexto(b)));
      hablar(partes.join('.\n'), leer);
    };

    document.getElementById('logrado').onclick = () => {
      marcarHecha(i);
      confeti();
      const b = document.getElementById('logrado');
      b.textContent = i < L.length - 1 ? '⭐ ¡Excelente! Lección completada' : '🏆 ¡Terminaste todo el curso!';
      hablar(i < L.length - 1 ? '¡Muy bien! Lección completada. ¡Sigue así!' : '¡Felicitaciones! ¡Terminaste todo el curso!', null);
    };

    // Diploma (solo en la última lección)
    const nombre = document.getElementById('nombre-diploma');
    if (nombre) {
      const salida = document.getElementById('diploma-nombre');
      nombre.value = guardado.leer('nombre', '');
      const pintar = () => { salida.textContent = nombre.value.trim() || ' '; guardado.escribir('nombre', nombre.value); };
      nombre.oninput = pintar; pintar();
      document.getElementById('diploma-fecha').textContent =
        new Date().toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' });
      document.getElementById('imprimir-diploma').onclick = () => {
        document.body.classList.add('imprimir-diploma');
        window.print();
        setTimeout(() => document.body.classList.remove('imprimir-diploma'), 500);
      };
    }
  }

  /* ---------- Pantalla: diccionario ---------- */
  function vistaDiccionario() {
    main.innerHTML = `
      <div class="migas"><a class="boton secundario" href="#/">← Volver al mapa</a></div>
      <section class="bloque">
        <h1>📖 Diccionario</h1>
        <p>Palabras nuevas, explicadas fácil. Toca 🔊 para escucharlas todas, o busca una palabra.</p>
        <input class="buscador no-leer" id="buscar" type="search" placeholder="🔎 Buscar palabra (puedes dictarla con Windows + H)" aria-label="Buscar palabra">
        <dl id="lista-palabras">
          ${C.diccionario.map(([p, d]) => `<div class="palabra"><dt>${p}</dt><dd>${d}</dd></div>`).join('')}
        </dl>
      </section>`;
    mejorar(main);
    const buscar = document.getElementById('buscar');
    buscar.oninput = () => {
      const q = buscar.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      main.querySelectorAll('.palabra').forEach(el => {
        const t = el.textContent.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        el.hidden = q && !t.includes(q);
      });
    };
  }

  /* ---------- Pantalla: frases listas ---------- */
  function vistaFrases() {
    main.innerHTML = `
      <div class="migas"><a class="boton secundario" href="#/">← Volver al mapa</a></div>
      <header class="cabecera-leccion">
        <div class="emoji" aria-hidden="true">💬</div>
        <h1>Frases listas</h1>
        <p>Frases para usar con Claude. Toca <strong>🚀 Abrir en Claude</strong> o <strong>📋 Copiar</strong>.</p>
        <div class="caja truco"><span class="titulo-caja">💡 Las partes entre [corchetes]</span>
        <p>Son para cambiarlas por lo tuyo. Cuando la frase esté en Claude, borra esa parte y di lo que quieres con <kbd>⊞ Windows</kbd> + <kbd>H</kbd>.</p></div>
      </header>
      ${C.frases.map(g => `<section class="bloque"><h2>${g.grupo}</h2>${g.lista.map(t => `<div class="prompt">${t}</div>`).join('')}</section>`).join('')}
    `;
    mejorar(main);
  }

  /* ---------- Pantalla: guía del acompañante ---------- */
  function vistaGuia() {
    main.innerHTML = `
      <div class="migas"><a class="boton secundario" href="#/">← Volver al mapa</a></div>
      <header class="cabecera-leccion"><div class="emoji" aria-hidden="true">🤝</div><h1>Guía del acompañante</h1></header>
      ${C.guia}`;
    mejorar(main);
  }

  /* ---------- Navegación ---------- */
  function ruta() {
    callar();
    const h = location.hash.replace(/^#\/?/, '');
    const m = h.match(/^leccion\/(\d+)/);
    if (m) vistaLeccion(+m[1]);
    else if (h === 'diccionario') vistaDiccionario();
    else if (h === 'frases') vistaFrases();
    else if (h === 'guia') vistaGuia();
    else vistaInicio();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    const t = main.querySelector('h1');
    document.title = (t && h ? t.textContent + ' · ' : '') + 'Aprende IA con Claude';
  }
  window.addEventListener('hashchange', ruta);

  // Flechas del teclado para cambiar de lección (cómodo con una mano)
  document.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    const m = location.hash.match(/^#\/leccion\/(\d+)/);
    if (!m) return;
    const i = +m[1];
    if (e.key === 'ArrowRight' && i < L.length - 1) location.hash = '#/leccion/' + (i + 1);
    if (e.key === 'ArrowLeft' && i > 0) location.hash = '#/leccion/' + (i - 1);
  });

  ruta();
})();
