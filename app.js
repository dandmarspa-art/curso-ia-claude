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

  /* ---------- ¿Teléfono o computadora? ---------- */
  const ua = navigator.userAgent;
  let so = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) ? 'ios'
    : /Android/i.test(ua) ? 'android' : 'otro';
  const pareceMovil = so !== 'otro' || (matchMedia('(pointer: coarse)').matches && innerWidth < 900);
  let preferencia = guardado.leer('dispositivo', 'auto'); // 'auto' | 'movil' | 'pc'
  const esMovil = () => preferencia === 'movil' || (preferencia === 'auto' && pareceMovil);
  function aplicarDispositivo() {
    root.setAttribute('data-dispositivo', esMovil() ? 'movil' : 'pc');
    root.setAttribute('data-so', so);
  }
  aplicarDispositivo();
  const enApp = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  let avisoInstalar = null; // Android/Chrome: permite mostrar un botón "Instalar"
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); avisoInstalar = e;
    const b = document.getElementById('btn-instalar'); if (b) b.hidden = false;
  });
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('sw.js').catch(() => { /* sin modo sin conexión */ });
  }

  /* ---------- Ajustes: tamaño de letra, colores, voz ---------- */
  let escala = guardado.leer('escala', 1);
  const temas = ['auto', 'light', 'dark', 'contraste'];
  const nombresTema = { auto: 'Automático', light: 'Claro', dark: 'Oscuro', contraste: 'Alto contraste' };
  let tema = guardado.leer('tema', 'auto');
  // Voz: 'aparato' (la que trae el teléfono o la computadora), 'mujer' (Daniela) u 'hombre' (David)
  let vozElegida = guardado.leer('voz', 'aparato');
  let velocidad = guardado.leer('velocidad', guardado.leer('vozLenta', false) ? 'lenta' : 'normal');
  const RITMO_APARATO = { lenta: 0.75, normal: 0.95, rapida: 1.3 };
  const RITMO_AUDIO = { lenta: 0.8, normal: 1, rapida: 1.35 };

  function aplicarAjustes() {
    root.style.setProperty('--escala', escala);
    if (tema === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', tema);
    document.getElementById('btn-tema').title = 'Colores: ' + nombresTema[tema];
    const actual = { voz: vozElegida, velocidad };
    document.querySelectorAll('.selector-voz').forEach(grupo =>
      grupo.querySelectorAll('button').forEach(b =>
        b.setAttribute('aria-checked', b.dataset.valor === actual[grupo.dataset.ajuste] ? 'true' : 'false')));
  }
  document.getElementById('btn-mas').onclick = () => { escala = Math.min(1.6, +(escala + 0.1).toFixed(1)); guardado.escribir('escala', escala); aplicarAjustes(); };
  document.getElementById('btn-menos').onclick = () => { escala = Math.max(0.8, +(escala - 0.1).toFixed(1)); guardado.escribir('escala', escala); aplicarAjustes(); };
  document.getElementById('btn-tema').onclick = () => { tema = temas[(temas.indexOf(tema) + 1) % temas.length]; guardado.escribir('tema', tema); aplicarAjustes(); };
  document.querySelectorAll('.selector-voz[data-ajuste="voz"] button').forEach(b => {
    b.onclick = () => {
      vozElegida = b.dataset.valor;
      guardado.escribir('voz', vozElegida); aplicarAjustes();
      if (vozElegida === 'aparato' && !hayVoz) {
        alertaSuave('😕 Este aparato no puede leer en voz alta. Elige 👩 Daniela o 👨 David.', 'info');
        return;
      }
      hablar(FRASES_VOZ[vozElegida], null);
    };
  });
  document.querySelectorAll('.selector-voz[data-ajuste="velocidad"] button').forEach(b => {
    b.onclick = () => {
      velocidad = b.dataset.valor;
      guardado.escribir('velocidad', velocidad); aplicarAjustes();
      reproductor.playbackRate = RITMO_AUDIO[velocidad]; // si está sonando un audio, cambia al tiro
    };
  });
  document.getElementById('btn-callar').onclick = () => callar();
  document.getElementById('btn-inicio').onclick = () => { location.hash = '#/'; };
  const btnAjustes = document.getElementById('btn-ajustes');
  btnAjustes.onclick = () => {
    const panel = document.getElementById('ajustes');
    const abierto = panel.classList.toggle('abierto');
    btnAjustes.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  };
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
  // Texto que se lee de un cuadro. Le ponemos un punto al final de títulos y de cada punto
  // de una lista, para que la voz haga una pausa.
  function limpiarTexto(el) {
    const copia = el.cloneNode(true);
    // No leemos lo que está escondido (instrucciones del otro aparato)
    const ocultos = ['button', '.escuchar', '.no-leer', 'textarea', 'input', '.botones', esMovil() ? '.solo-pc' : '.solo-movil'];
    if (so === 'ios') ocultos.push('.solo-android');
    if (so === 'android') ocultos.push('.solo-ios');
    copia.querySelectorAll(ocultos.join(',')).forEach(n => n.remove());
    [...copia.querySelectorAll('h1,h2,h3,p,li,td,th,dt,dd,.titulo-caja,.etq,a.video,.texto-prompt')].reverse().forEach(n => {
      const t = n.textContent.replace(/[\p{Extended_Pictographic}\u{FE0F}\s]+$/gu, '');
      n.append(t && !/[.!?:;,]$/.test(t) ? '. ' : ' ');
    });
    return copia.textContent
      .replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{20E3}]/gu, '')
      .replace(/[⊞↵⇧⌫←⬅➡]/g, '')
      .replace(/→/g, ', ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,:;!?])/g, '$1')
      .replace(/([.!?:;,])(\s*[.,])+/g, '$1')
      .trim();
  }
  function textoDeHtml(html) {
    const d = document.createElement('div'); d.innerHTML = html; return limpiarTexto(d);
  }

  /* Audios ya grabados (carpeta audio/). Si un texto no tiene audio, lo lee la voz del aparato. */
  const AUDIOS = window.CURSO_AUDIOS || {};
  const FRASES_VOZ = {
    aparato: 'Hola. Ahora te leo con la voz de este aparato.',
    mujer: 'Hola, soy Daniela. Ahora te leo yo.',
    hombre: 'Hola, soy David. Ahora te leo yo.',
  };
  // Huella corta de un texto (FNV-1a): el nombre del archivo de audio. Igual que en herramientas/grabar-audios.js
  function huella(t) {
    t = t.replace(/\s+/g, ' ').trim();
    let h = 0x811c9dc5;
    for (const c of t) { h ^= c.codePointAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  const tieneAudio = (t) => vozElegida !== 'aparato' && (AUDIOS[vozElegida] || []).includes(huella(t));
  const reproductor = new Audio();
  let turno = 0; // cambia cada vez que se detiene la voz, para cortar lo que estaba sonando

  function callar() {
    turno++;
    reproductor.pause();
    if (hayVoz) speechSynthesis.cancel();
    if (botonHablando) {
      botonHablando.classList.remove('hablando');
      botonHablando.textContent = botonHablando.dataset.original;
      if (botonHablando.classList.contains('escuchar')) botonHablando.setAttribute('aria-label', 'Escuchar este cuadro');
      else botonHablando.removeAttribute('aria-label');
    }
    botonHablando = null;
  }
  function tocarAudio(texto) {
    return new Promise((listo) => {
      reproductor.src = 'audio/' + vozElegida + '/' + huella(texto) + '.mp3';
      reproductor.playbackRate = RITMO_AUDIO[velocidad];
      reproductor.onended = () => listo(true);
      reproductor.onerror = () => listo(false);
      reproductor.play().catch(() => listo(false));
    });
  }
  function decirConVozDelAparato(texto, mio) {
    return new Promise((listo) => {
      if (!hayVoz) { alertaSuave('Tu navegador no puede leer en voz alta. Prueba con Microsoft Edge o Google Chrome.'); return listo(); }
      // Partimos el texto en frases: los navegadores cortan textos muy largos
      const frases = texto.split(/(?<=[.!?:;])\s+|\n+/).map(f => f.trim()).filter(Boolean);
      if (!frases.length) return listo();
      cargarVoces();
      const voz = elegirVoz();
      frases.forEach((f, i) => {
        const u = new SpeechSynthesisUtterance(f);
        u.lang = voz ? voz.lang : 'es-MX';
        if (voz) u.voice = voz;
        u.rate = RITMO_APARATO[velocidad];
        if (i === frases.length - 1) { u.onend = () => listo(); u.onerror = () => listo(); }
        if (turno === mio) speechSynthesis.speak(u);
      });
    });
  }
  // partes: un texto o una lista de textos que se leen uno tras otro
  async function hablar(partes, boton) {
    const mismo = boton && boton === botonHablando;
    callar();
    if (mismo) return; // segundo toque = detener
    const mio = turno;
    botonHablando = boton || null;
    if (boton) {
      boton.dataset.original = boton.textContent;
      boton.classList.add('hablando');
      boton.textContent = boton.classList.contains('escuchar') ? '⏹' : '⏹ Detener lectura';
      boton.setAttribute('aria-label', 'Detener');
    }
    for (const parte of [].concat(partes)) {
      if (turno !== mio) return;
      const sono = tieneAudio(parte) && await tocarAudio(parte);
      if (turno !== mio) return;
      if (!sono) await decirConVozDelAparato(parte, mio);
    }
    if (turno === mio) callar();
  }

  const textoIntro = (l) => textoDeHtml(`<h1>${l.titulo}</h1><p>Vas a aprender:</p><ul>${l.aprenderas.map(a => `<li>${a}</li>`).join('')}</ul>`);

  // Todos los textos que se pueden leer en voz alta, en las versiones de computadora,
  // Android e iPhone. Lo usa herramientas/grabar-audios.js (abriendo el curso en #/textos).
  function todosLosTextos() {
    const textos = new Set([FRASES_VOZ.mujer, FRASES_VOZ.hombre]);
    textos.add('¡Muy bien! Lección completada. ¡Sigue así!');
    textos.add('¡Felicitaciones! ¡Terminaste todo el curso!');
    const antes = [preferencia, so];
    for (const [pref, sist] of [['pc', 'otro'], ['movil', 'android'], ['movil', 'ios']]) {
      preferencia = pref; so = sist; aplicarDispositivo();
      const vistas = [vistaInicio, vistaDiccionario, vistaFrases, vistaGuia, ...L.map((_, i) => () => vistaLeccion(i))];
      vistas.forEach((v, i) => {
        v();
        if (i >= 4) textos.add(textoIntro(L[i - 4]));
        main.querySelectorAll('.bloque').forEach(b => textos.add(limpiarTexto(b)));
      });
    }
    [preferencia, so] = antes; aplicarDispositivo();
    return [...textos].filter(Boolean);
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

  function alertaSuave(msj, tipo) {
    const d = document.createElement('div');
    d.className = 'caja aviso-flotante ' + (tipo || 'ojo'); d.setAttribute('role', 'status'); d.textContent = msj;
    document.body.appendChild(d); setTimeout(() => d.remove(), 7000);
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
      const comoPegar = () => esMovil() ? 'deja el dedo apretado en la caja de Claude y toca "Pegar"' : 'pega con Ctrl + V';
      abrir.onclick = () => { copiar(texto); aviso.textContent = '✅ Se abrió Claude. Si la frase no aparece, ' + comoPegar() + '.'; };
      const cp = document.createElement('button');
      cp.className = 'boton secundario'; cp.type = 'button'; cp.innerHTML = '📋 Copiar';
      cp.onclick = async () => {
        const ok = await copiar(texto);
        aviso.textContent = ok ? '✅ ¡Copiado! Ahora ve a Claude y ' + comoPegar() + '.' : '😕 No se pudo copiar. Usa el botón "Abrir en Claude".';
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

      ${esMovil() && !enApp ? `
      <section class="bloque">
        <h2>📲 Pon el curso en tu teléfono, como una app</h2>
        <p>Así lo abres con un toque, <strong>sin buscar el link</strong>, y funciona aunque no tengas internet.</p>
        <button class="boton ancho" id="btn-instalar" type="button" ${avisoInstalar ? '' : 'hidden'}>📲 Instalar el curso</button>
        <div class="pasos solo-android"><ol>
          <li>Toca los <strong>3 puntitos ⋮</strong> arriba a la derecha de Chrome.</li>
          <li>Toca <strong>"Agregar a la pantalla principal"</strong> o <strong>"Instalar app"</strong>.</li>
          <li>Toca <strong>"Agregar"</strong> o <strong>"Instalar"</strong>. ¡Listo! Busca el ícono 🎙️ en tu teléfono.</li>
        </ol></div>
        <div class="pasos solo-ios"><ol>
          <li>Abre este curso en <strong>Safari</strong>.</li>
          <li>Toca el botón <strong>Compartir</strong> (un cuadrado con una flecha hacia arriba ⬆️).</li>
          <li>Baja y toca <strong>"Agregar a inicio"</strong>.</li>
          <li>Toca <strong>"Agregar"</strong>. ¡Listo! Busca el ícono 🎙️ en tu teléfono.</li>
        </ol></div>
      </section>` : ''}

      <h2>🧭 Cómo usar este curso</h2>
      <div class="instrucciones">
        <div class="instr"><span class="ico">🔊</span><p>Toca <strong>🔊</strong> en cualquier cuadro para <strong>escucharlo</strong>. ${esMovil() ? 'En <strong>⚙️</strong>' : 'Arriba'} puedes elegir <strong>quién te lee</strong> (la voz del aparato, 👩 Daniela o 👨 David) y la <strong>velocidad</strong>.</p></div>
        <div class="instr"><span class="ico">🚀</span><p>Los botones <strong>"Abrir en Claude"</strong> escriben las frases por ti.</p></div>
        <div class="instr"><span class="ico">🔠</span><p>${esMovil() ? 'Toca <strong>⚙️</strong> arriba para agrandar la letra y cambiar los colores.' : 'Usa <strong>A+</strong> y <strong>A−</strong> arriba para cambiar el tamaño de la letra.'}</p></div>
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

      <section class="bloque cambiar-dispositivo no-leer" style="margin-top:2rem">
        <p>${esMovil() ? '📱 Estás viendo la versión para <strong>teléfono</strong>.' : '💻 Estás viendo la versión para <strong>computadora</strong>.'}</p>
        <button class="boton secundario" id="btn-dispositivo" type="button">${esMovil() ? '💻 Ver versión computadora' : '📱 Ver versión teléfono'}</button>
      </section>
    `;
    mejorar(main);
    main.querySelector('.cambiar-dispositivo .escuchar')?.remove();
    document.getElementById('btn-dispositivo').onclick = () => {
      const quiero = esMovil() ? 'pc' : 'movil';
      preferencia = quiero === (pareceMovil ? 'movil' : 'pc') ? 'auto' : quiero;
      guardado.escribir('dispositivo', preferencia);
      aplicarDispositivo(); vistaInicio();
    };
    const instalar = document.getElementById('btn-instalar');
    if (instalar) instalar.onclick = async () => {
      if (!avisoInstalar) return;
      avisoInstalar.prompt();
      await avisoInstalar.userChoice.catch(() => null);
      avisoInstalar = null; instalar.hidden = true;
    };
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
        <div class="nivel">Nivel ${l.nivel} · Lección ${i} de ${L.length - 1}</div>
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
      <p class="pista-teclas solo-pc">💡 También puedes usar las flechas <kbd>←</kbd> <kbd>→</kbd> del teclado para cambiar de lección.</p>
    `;
    mejorar(main);

    const leer = document.getElementById('leer-todo');
    leer.onclick = () => {
      const partes = [textoIntro(l)];
      main.querySelectorAll('#cuerpo .bloque').forEach(b => partes.push(limpiarTexto(b)));
      hablar(partes, leer);
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
        <input class="buscador no-leer" id="buscar" type="search" placeholder="🔎 Buscar palabra (puedes dictarla ${esMovil() ? 'con el micrófono 🎤' : 'con Windows + H'})" aria-label="Buscar palabra">
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
        <p>Son para cambiarlas por lo tuyo. Cuando la frase esté en Claude, borra esa parte, ${C.ayudas.DICTA} y di lo que quieres.</p></div>
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
    else if (h === 'textos') { // solo para herramientas/grabar-audios.js
      const textos = todosLosTextos();
      main.innerHTML = '<pre id="textos-json"></pre>';
      document.getElementById('textos-json').textContent = JSON.stringify(textos.map(t => ({ huella: huella(t), texto: t })));
    }
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
