/* =========================================================
   CONTENIDO DEL CURSO
   Para cambiar un texto, edita este archivo y guarda.
   ========================================================= */

// --- Ayudantes para escribir menos HTML ---
const pr = (texto) => `<div class="prompt">${texto}</div>`;
const yt = (busqueda, titulo) =>
  `<a class="video" href="https://www.youtube.com/results?search_query=${encodeURIComponent(busqueda)}" target="_blank" rel="noopener"><span class="video-icono" aria-hidden="true">▶</span><span>${titulo || busqueda}</span></a>`;
const web = (url, titulo) =>
  `<a class="video" href="${url}" target="_blank" rel="noopener"><span class="video-icono web" aria-hidden="true">🌐</span><span>${titulo}</span></a>`;
const videos = (...enlaces) => `
  <section class="bloque">
    <h2>🎬 Videos y enlaces</h2>
    <p>Cada botón abre YouTube con videos sobre este tema. Elige uno que te guste. Si un video es muy difícil, no pasa nada: prueba otro o pídele a Claude que te lo explique.</p>
    <div class="videos">${enlaces.join('')}</div>
  </section>`;

// --- Texto distinto para computadora y teléfono ---
// En el teléfono se muestra lo de "movil"; en la computadora, lo de "pc".
const dos = (pc, movil) => `<span class="solo-pc">${pc}</span><span class="solo-movil">${movil}</span>`;
const DICTA = dos('aprieta <kbd>⊞ Windows</kbd> + <kbd>H</kbd>', 'toca el <strong>micrófono 🎤</strong> del teclado');
const PEGA = dos('pega con <kbd>Ctrl</kbd> + <kbd>V</kbd>', 'deja el dedo apretado en la caja y toca <strong>Pegar</strong>');
const ENVIA = dos('envía con <kbd>Enter ↵</kbd>', 'envía tocando la <strong>flecha ⬆️</strong>');

window.CURSO = {};
window.CURSO.ayudas = { dos, DICTA, PEGA, ENVIA };

window.CURSO.lecciones = [

/* ---------------------------------------------------------- 0 */
{
  emoji: '👋', nivel: 0, etapa: '🌱 Primeros pasos', minutos: 15,
  titulo: '¡Hola! ¿Qué es la IA?',
  aprenderas: [
    'Qué es la inteligencia artificial (IA), con palabras fáciles',
    'Quién es Claude',
    'Qué cosas puede hacer la IA y qué cosas no',
  ],
  html: `
  <section class="bloque">
    <h2>👋 Bienvenido</h2>
    <p>Este curso es para ti. Vamos a ir <strong>despacito</strong>, paso a paso.</p>
    <p>No necesitas saber nada. No necesitas escribir rápido. <strong>Vas a usar tu voz.</strong></p>
    <div class="caja truco"><span class="titulo-caja">💡 ¿Ves el botón 🔊 en cada cuadro?</span>
    <p>Si lo tocas, la computadora te lee el texto en voz alta. Úsalo cuando quieras.</p></div>
  </section>

  <section class="bloque">
    <h2>🤖 ¿Qué es la IA?</h2>
    <p><strong>IA</strong> significa <strong>Inteligencia Artificial</strong>.</p>
    <p>Es un programa de computadora que <strong>entiende lo que le dices</strong> y <strong>te responde</strong>.</p>
    <p>Imagina un ayudante que leyó millones de libros. Le puedes preguntar cosas, pedirle ideas o pedirle ayuda, y te contesta como en una conversación.</p>
    <div class="caja info"><span class="titulo-caja">📱 Es como chatear</span>
    <p>Hablar con una IA es parecido a mandar mensajes por WhatsApp. Tú mandas un mensaje y la IA te responde.</p></div>
  </section>

  <section class="bloque">
    <h2>🧡 ¿Quién es Claude?</h2>
    <p><strong>Claude</strong> es el nombre de una IA. La creó una empresa llamada <strong>Anthropic</strong>.</p>
    <p>Hay otras IA famosas (como ChatGPT o Gemini), pero en este curso vamos a aprender con Claude.</p>
    <p>Lo bueno: lo que aprendas aquí <strong>también te sirve para las otras IA</strong>. Todas funcionan parecido.</p>
  </section>

  <section class="bloque">
    <h2>✨ ¿Qué puede hacer Claude?</h2>
    <ul>
      <li>💬 <strong>Conversar</strong> contigo y responder preguntas.</li>
      <li>📚 <strong>Explicarte</strong> cosas difíciles con palabras fáciles.</li>
      <li>💡 <strong>Darte ideas</strong> (para un dibujo, un logo, un regalo, un nombre...).</li>
      <li>🎨 <strong>Ayudarte a diseñar</strong>: colores, letras, logos, carteles.</li>
      <li>👀 <strong>Mirar fotos</strong> y decirte qué ve.</li>
      <li>✍️ <strong>Escribir</strong> mensajes, cuentos o textos por ti.</li>
      <li>🛠️ <strong>Crear cosas</strong>: páginas web, juegos sencillos, tarjetas.</li>
    </ul>
  </section>

  <section class="bloque">
    <h2>🚫 Lo que la IA NO es</h2>
    <ul>
      <li>❌ <strong>No es una persona.</strong> Es un programa.</li>
      <li>❌ <strong>No sabe todo.</strong> A veces se equivoca, y lo dice muy seguro.</li>
      <li>❌ <strong>No es mágica.</strong> Funciona mejor cuando le explicas bien lo que quieres.</li>
    </ul>
    <div class="caja bien"><span class="titulo-caja">✅ Lo más importante</span>
    <p><strong>Tú eres el jefe.</strong> La IA es tu ayudante. Tú decides qué está bien y qué no.</p></div>
  </section>

  <section class="bloque">
    <h2>📖 Tus primeras palabras nuevas</h2>
    <ul>
      <li><strong>IA</strong>: Inteligencia Artificial.</li>
      <li><strong>Chat</strong>: una conversación escrita.</li>
      <li><strong>Prompt</strong> (se dice "prompt"): lo que tú le pides a la IA. Tu mensaje.</li>
      <li><strong>Respuesta</strong>: lo que la IA te contesta.</li>
    </ul>
    <p>Si olvidas una palabra, búscala en el <a href="#/diccionario">📖 Diccionario</a> del curso.</p>
  </section>

  ${videos(
    yt('qué es la inteligencia artificial explicación fácil', '¿Qué es la inteligencia artificial? (explicado fácil)'),
    yt('qué es Claude IA Anthropic español', '¿Qué es Claude?'),
    yt('cómo funciona un chatbot explicado para niños', '¿Cómo funciona un chat con IA?')
  )}
  `,
  mision: [
    'Escuché esta lección con el botón 🔊',
    'Vi un video sobre qué es la IA',
    'Puedo decir en voz alta: "La IA es un programa que entiende lo que le digo y me responde"',
  ],
},

/* ---------------------------------------------------------- 1 */
{
  emoji: '🎙️', nivel: 10, etapa: '🌱 Primeros pasos', minutos: 25,
  titulo: 'Tu voz es tu teclado',
  aprenderas: [
    dos('Escribir en la computadora hablando (dictado por voz)', 'Escribir en el teléfono hablando (dictado por voz)'),
    dos('Escribir en el teléfono hablando', 'Controlar el teléfono con la voz'),
    dos('Trucos para usar la computadora con una sola mano', 'Trucos para usar el teléfono con una sola mano'),
  ],
  html: `
  <section class="bloque">
    <h2>🎙️ ¿Por qué usar la voz?</h2>
    <p>Escribir con el teclado puede cansar y ser lento. <strong>Hablar es mucho más rápido.</strong></p>
    <p>La computadora y el teléfono pueden <strong>escuchar lo que dices y escribirlo por ti</strong>. Eso se llama <strong>dictado por voz</strong>.</p>
    <div class="caja bien"><span class="titulo-caja">✅ Buena noticia</span>
    <p>Si el dictado escribe algo mal, <strong>no importa</strong>. Claude es muy bueno entendiendo aunque haya errores. ¡No tiene que quedar perfecto!</p></div>
  </section>

  <section class="bloque solo-movil">
    <h2>📱 Escribir hablando en el teléfono</h2>
    <p>Tu teléfono ya trae un <strong>micrófono en el teclado</strong>. Con él, puedes escribir en cualquier app hablando.</p>
    <div class="pasos"><ol>
      <li>Toca donde quieres escribir (por ejemplo, el cuadro de abajo 👇). Aparece el teclado.</li>
      <li>Busca el <strong>micrófono 🎤</strong> en el teclado.
        <span class="solo-android">En Android (teclado Gboard) suele estar <strong>arriba a la derecha</strong> del teclado.</span>
        <span class="solo-ios">En iPhone está <strong>abajo a la derecha</strong>, debajo de las letras.</span></li>
      <li>Tócalo. Cuando el teléfono te escucha, el micrófono cambia de color o aparecen ondas.</li>
      <li><strong>Habla tranquilo</strong>, como si le hablaras a un amigo.</li>
      <li>Cuando termines, toca el micrófono otra vez (o espera, se apaga solo).</li>
    </ol></div>
    <div class="caja truco"><span class="titulo-caja">💡 Los puntos y las comas</span>
    <p>Puedes decir <strong>"punto"</strong>, <strong>"coma"</strong> o <strong>"signo de interrogación"</strong> y el teléfono los escribe. Si se te olvida, no importa: Claude te entiende igual.</p></div>
    <div class="caja info"><span class="titulo-caja">🌐 Si escribe en otro idioma</span>
    <p>Revisa que el teclado esté en <strong>español</strong>. Pídele ayuda a tu acompañante si hace falta.</p></div>
  </section>

  <section class="bloque solo-movil">
    <h2>🏋️ ¡Practica aquí!</h2>
    <p>Toca el cuadro, toca el <strong>micrófono 🎤</strong> del teclado y di: <em>"Hola, me llamo... y me gusta el diseño gráfico."</em></p>
    <textarea class="practica" aria-label="Cuadro para practicar el dictado" placeholder="Toca aquí y habla con el micrófono 🎤"></textarea>
    <p style="margin-top:.8rem">¿Salió? ¡Muy bien! 🎉 ¿Salió con errores? ¡También muy bien! Practica unas veces más.</p>
  </section>

  <section class="bloque solo-movil">
    <h2>✋ Usar el teléfono con una mano</h2>
    <div class="solo-android">
      <p><strong>Modo una mano:</strong> baja la pantalla para que llegues arriba con el pulgar.</p>
      <p>Búscalo en <strong>Ajustes</strong>: escribe o dicta <em>"una mano"</em> en el buscador de Ajustes.</p>
      <p><strong>Teclado para una mano:</strong> en Gboard, deja el dedo apretado en la tecla de la coma o en ⚙️ y elige el ícono de la mano. El teclado se hace más chico y se pega a un lado.</p>
    </div>
    <div class="solo-ios">
      <p><strong>Alcance:</strong> baja la pantalla para que llegues arriba con el pulgar. Se activa en <strong>Ajustes → Accesibilidad → Tocar → Alcance</strong>. Después, desliza el dedo hacia abajo en el borde de abajo de la pantalla.</p>
      <p><strong>Teclado para una mano:</strong> deja el dedo apretado en el globo 🌐 o el emoji 😀 del teclado y elige el teclado pegado a la izquierda.</p>
    </div>
    <p><strong>Letra más grande:</strong> en <strong>Ajustes</strong>, busca <em>"tamaño de fuente"</em> o <em>"tamaño del texto"</em>. Y en este curso, usa ⚙️ arriba.</p>
  </section>

  <section class="bloque solo-movil">
    <h2>🗣️ Nivel experto: controla el teléfono con la voz</h2>
    <p>Puedes pedirle cosas al teléfono sin tocarlo:</p>
    <ul>
      <li class="solo-android">🗣️ <em>"Ok Google, abre Claude."</em></li>
      <li class="solo-ios">🗣️ <em>"Oye Siri, abre Claude."</em></li>
    </ul>
    <div class="solo-android"><p>Y hay una app de Google llamada <strong>Voice Access</strong> para controlar <strong>todo</strong> con la voz: <em>"toca Enviar"</em>, <em>"desplázate hacia abajo"</em>. Está en la Play Store.</p></div>
    <div class="solo-ios"><p>Y el iPhone tiene <strong>Control por voz</strong> para manejar <strong>todo</strong> con la voz: <em>"toca Enviar"</em>, <em>"desplaza hacia abajo"</em>. Está en <strong>Ajustes → Accesibilidad → Control por voz</strong>.</p></div>
    <div class="caja info"><p>Esto es opcional. Si te parece difícil, sáltalo por ahora. El micrófono del teclado es suficiente para todo el curso.</p></div>
  </section>

  <section class="bloque solo-movil">
    <h2>💻 ¿Y en la computadora?</h2>
    <p>En la computadora también puedes dictar: se usan las teclas <kbd>⊞ Windows</kbd> + <kbd>H</kbd>. Cuando abras este curso en la computadora, esta lección te lo explica paso a paso.</p>
  </section>

  <section class="bloque solo-pc">
    <h2>💻 En la computadora (Windows)</h2>
    <p>Para dictar, se usan dos teclas juntas:</p>
    <div class="teclas"><kbd>⊞ Windows</kbd> + <kbd>H</kbd></div>
    <div class="pasos"><ol>
      <li>Haz clic donde quieres escribir (por ejemplo, el cuadro de abajo 👇).</li>
      <li>Aprieta la tecla <kbd>⊞ Windows</kbd> (abajo a la izquierda, tiene una ventanita) y, sin soltarla, aprieta la <kbd>H</kbd>.</li>
      <li>Aparece una barrita con un <strong>micrófono 🎤</strong>. Cuando se pone de color, te está escuchando.</li>
      <li><strong>Habla tranquilo</strong>, como si le hablaras a un amigo.</li>
      <li>Cuando termines, haz clic en el micrófono o espera unos segundos y se apaga solo.</li>
    </ol></div>
    <div class="caja truco"><span class="titulo-caja">💡 Truco: pon el punto automático</span>
    <p>En la barrita del micrófono hay una ruedita ⚙️. Tócala y activa <strong>"Puntuación automática"</strong>. Así Windows pone los puntos y comas solo.</p></div>
    <div class="caja info"><span class="titulo-caja">🌐 Necesita internet</span>
    <p>El dictado funciona mejor con internet. Si no entiende español, pídele a tu acompañante que revise el idioma en Configuración de Windows.</p></div>
  </section>

  <section class="bloque solo-pc">
    <h2>🏋️ ¡Practica aquí!</h2>
    <p>Haz clic en el cuadro, aprieta <kbd>⊞ Windows</kbd> + <kbd>H</kbd> y di: <em>"Hola, me llamo... y me gusta el diseño gráfico."</em></p>
    <textarea class="practica" aria-label="Cuadro para practicar el dictado" placeholder="Haz clic aquí y habla con Windows + H 🎙️"></textarea>
    <p style="margin-top:.8rem">¿Salió? ¡Muy bien! 🎉 ¿Salió con errores? ¡También muy bien! Practica unas veces más.</p>
  </section>

  <section class="bloque solo-pc">
    <h2>✋ Trucos para usar una sola mano</h2>
    <p><strong>Teclas especiales (teclas pegajosas):</strong> te dejan apretar las teclas <strong>una por una</strong> en vez de juntas.</p>
    <div class="pasos"><ol>
      <li>Aprieta la tecla <kbd>Shift ⇧</kbd> <strong>5 veces seguidas</strong>.</li>
      <li>Aparece una pregunta. Elige <strong>"Sí"</strong>.</li>
      <li>Ahora puedes apretar <kbd>⊞ Windows</kbd>, soltar, y después <kbd>H</kbd>. ¡Funciona igual!</li>
    </ol></div>
    <p><strong>Teclas que vas a usar mucho:</strong></p>
    <ul>
      <li><kbd>Enter ↵</kbd> = enviar el mensaje.</li>
      <li><kbd>Ctrl</kbd> + <kbd>V</kbd> = pegar algo que copiaste.</li>
      <li><kbd>⊞ Windows</kbd> + <kbd>H</kbd> = dictar con la voz.</li>
    </ul>
  </section>

  <section class="bloque solo-pc">
    <h2>🗣️ Nivel experto: controla la computadora con la voz</h2>
    <p>Windows 11 tiene algo llamado <strong>"Acceso por voz"</strong>. Con eso puedes decir cosas como <em>"abrir Edge"</em> o <em>"haz clic en Enviar"</em> y la computadora lo hace.</p>
    <div class="pasos"><ol>
      <li>Aprieta la tecla <kbd>⊞ Windows</kbd>.</li>
      <li>Di o escribe: <strong>acceso por voz</strong>.</li>
      <li>Ábrelo y sigue la guía que te muestra.</li>
    </ol></div>
    <div class="caja info"><p>Esto es opcional. Si te parece difícil, sáltalo por ahora. El dictado con <kbd>⊞</kbd> + <kbd>H</kbd> es suficiente para todo el curso.</p></div>
  </section>

  <section class="bloque solo-pc">
    <h2>📱 En el teléfono</h2>
    <p>¡En el teléfono es todavía más fácil!</p>
    <div class="pasos"><ol>
      <li>Toca donde quieres escribir. Aparece el teclado.</li>
      <li>Busca el <strong>micrófono 🎤</strong> en el teclado (en Android suele estar arriba a la derecha; en iPhone, abajo).</li>
      <li>Tócalo y habla.</li>
    </ol></div>
    <p>La app de Claude en el teléfono también tiene su propio micrófono. Lo veremos más adelante.</p>
  </section>

  <section class="bloque">
    <h2>⭐ Consejos para dictar bien</h2>
    <ul>
      <li>🤫 Busca un lugar tranquilo, sin mucho ruido.</li>
      <li>🐢 Habla a velocidad normal, sin gritar.</li>
      <li>🎧 Unos audífonos con micrófono ayudan mucho.</li>
      <li>😌 Si se equivoca, respira. No pasa nada. Puedes borrar con ${dos('<kbd>⌫ Retroceso</kbd>', 'la tecla de borrar ⌫')} o simplemente seguir.</li>
    </ul>
  </section>

  ${videos(
    yt('dictado por voz Windows 11 tecla Windows H tutorial español', 'Dictado por voz en Windows (Windows + H)'),
    yt('acceso por voz Windows 11 español tutorial', 'Acceso por voz en Windows 11'),
    yt('teclas especiales sticky keys Windows 11 español', 'Teclas especiales (usar el teclado con una mano)'),
    yt('dictado por voz teclado Gboard Android tutorial', 'Dictado en teléfono Android'),
    yt('dictado por voz iPhone teclado tutorial español', 'Dictado en iPhone')
  )}
  `,
  mision: [
    dos('Escribí una frase hablando, con Windows + H', 'Escribí una frase hablando, con el micrófono 🎤 del teclado'),
    dos('Activé la puntuación automática', 'Dije "punto" o "coma" y el teléfono lo escribió'),
    dos('Probé el micrófono del teclado de mi teléfono', 'Probé el modo una mano (o el teclado para una mano)'),
    dos('(Opcional) Activé las teclas especiales', '(Opcional) Abrí una app diciendo "Ok Google" u "Oye Siri"'),
  ],
},

/* ---------------------------------------------------------- 2 */
{
  emoji: '🧡', nivel: 20, etapa: '🌱 Primeros pasos', minutos: 20,
  titulo: 'Conoce a Claude y crea tu cuenta',
  aprenderas: [
    'Crear tu cuenta gratis de Claude',
    'Dónde está cada botón en la pantalla',
    'Instalar Claude en la computadora y el teléfono',
  ],
  html: `
  <section class="bloque">
    <h2>🆓 Claude es gratis para empezar</h2>
    <p>Claude tiene un <strong>plan gratis</strong>. Con ese plan puedes hacer casi todo lo de este curso.</p>
    <p>Existe también un plan de pago (llamado <strong>Pro</strong>) con más cosas, pero <strong>no lo necesitas ahora</strong>.</p>
    <div class="caja info"><span class="titulo-caja">⏳ El plan gratis tiene un límite</span>
    <p>Si hablas mucho con Claude, en algún momento te dirá que esperes. Es normal. Después de unas horas puedes seguir. Aprovecha para descansar 😊.</p></div>
  </section>

  <section class="bloque">
    <h2>📝 Crear tu cuenta</h2>
    <div class="caja truco solo-movil"><span class="titulo-caja">📱 En el teléfono es más fácil con la app</span>
    <p>Primero instala la app de Claude (mira el cuadro <strong>"Claude en tu teléfono"</strong> más abajo). Después ábrela y sigue estos mismos pasos desde el paso 3.</p></div>
    <div class="pasos"><ol>
      <li>Abre el navegador (${dos('Chrome o Edge', 'Chrome o Safari')}).</li>
      <li>Ve a la página <strong>claude.ai</strong> (o toca el botón de abajo).</li>
      <li>Toca <strong>"Continuar con Google"</strong>. Es lo más fácil: <strong>no tienes que escribir contraseñas</strong>.</li>
      <li>Elige tu cuenta de Google (tu Gmail).</li>
      <li>Claude te hará unas preguntas cortas (tu nombre, tu edad). Contesta y acepta.</li>
      <li>¡Listo! Ya estás dentro. 🎉</li>
    </ol></div>
    <p><a class="boton" href="https://claude.ai" target="_blank" rel="noopener">🧡 Abrir claude.ai</a></p>
    <div class="caja truco"><span class="titulo-caja">💡 Si no tienes Gmail</span>
    <p>También puedes poner tu correo. Claude te manda un código a tu correo, lo copias y listo.</p></div>
  </section>

  <section class="bloque">
    <h2>🗺️ El mapa de la pantalla</h2>
    <p>Cuando entras, vas a ver estas partes. (Puede verse un poquito distinto, porque Claude cambia a veces.)</p>
    <ul>
      <li>📝 <strong>La caja de texto</strong> (abajo o al centro): ahí va tu mensaje. Dice algo como <em>"¿Cómo puedo ayudarte?"</em></li>
      <li>⬆️ <strong>El botón enviar</strong>: una flecha.${dos(' También puedes apretar <kbd>Enter ↵</kbd>.', '')}</li>
      <li>➕ <strong>El botón más</strong>: para subir fotos y archivos.</li>
      <li>🎤 <strong>El micrófono</strong> (si aparece): para dictar directo en Claude.</li>
      <li class="solo-movil">〰️ <strong>Las ondas de sonido</strong> (en la app): para <strong>conversar hablando</strong>. Lo vemos en la lección 8.</li>
      <li>📚 ${dos('<strong>La barra de la izquierda</strong>: tus conversaciones anteriores. Si no la ves, busca un ícono de menú ☰.', '<strong>El menú ☰</strong> (arriba a la izquierda): ahí están tus conversaciones anteriores.')}</li>
      <li>✏️ <strong>"Nuevo chat"</strong>: empezar una conversación nueva.</li>
    </ul>
  </section>

  <section class="bloque">
    <h2>💻 Claude en tu computadora</h2>
    <p>Puedes usar Claude de dos formas:</p>
    <ul>
      <li>🌐 <strong>En el navegador</strong>: entrando a claude.ai. Es lo más simple.</li>
      <li>🖥️ <strong>Con la app de escritorio</strong>: un programa que se instala en Windows.</li>
    </ul>
    <p>Para instalar la app, ve a <strong>claude.ai/download</strong>, descarga la versión de Windows y ábrela.</p>
    <p><a class="boton secundario" href="https://claude.ai/download" target="_blank" rel="noopener">⬇️ Descargar Claude para Windows</a></p>
    <div class="caja truco solo-pc"><span class="titulo-caja">💡 Guarda claude.ai en favoritos</span>
    <p>En el navegador, cuando estés en claude.ai, aprieta la estrellita ☆ arriba a la derecha. Así lo encuentras rápido.</p></div>
  </section>

  <section class="bloque">
    <h2>📱 Claude en tu teléfono</h2>
    <div class="pasos"><ol>
      <li>Abre la tienda: <strong>Play Store</strong> (Android) o <strong>App Store</strong> (iPhone).</li>
      <li>Busca <strong>"Claude"</strong> (con el micrófono 🎤 de la tienda, ¡sin escribir!).</li>
      <li>Instala la app de <strong>Anthropic</strong> (tiene un dibujo naranja).</li>
      <li>Entra con la <strong>misma cuenta</strong> que usaste en la computadora.</li>
    </ol></div>
    <p>Tus conversaciones aparecen en los dos lugares. ¡Empiezas en el teléfono y sigues en la computadora!</p>
    <div class="caja ojo"><span class="titulo-caja">⚠️ Cuidado con apps falsas</span>
    <p>Instala solo la app oficial, hecha por <strong>Anthropic</strong>. No pagues nada a apps que dicen ser Claude.</p></div>
  </section>

  ${videos(
    yt('cómo crear cuenta en Claude AI gratis tutorial español', 'Cómo crear tu cuenta en Claude'),
    yt('Claude AI tutorial para principiantes español', 'Tutorial de Claude para principiantes'),
    yt('Claude app celular tutorial español', 'La app de Claude en el teléfono'),
    web('https://support.claude.com', 'Centro de ayuda oficial de Claude (se puede traducir con el navegador)')
  )}
  `,
  mision: [
    'Creé mi cuenta en claude.ai',
    dos('Guardé claude.ai en favoritos', 'Puse la app de Claude en mi pantalla de inicio, fácil de alcanzar'),
    'Instalé la app de Claude en mi teléfono',
    'Encontré la caja de texto, el botón enviar y el botón ➕',
  ],
},

/* ---------------------------------------------------------- 3 */
{
  emoji: '💬', nivel: 30, etapa: '🌱 Primeros pasos', minutos: 25,
  titulo: 'Tu primera conversación',
  aprenderas: [
    'Mandar tu primer mensaje hablando',
    'Usar los botones "Copiar" y "Abrir en Claude" de este curso',
    'Pedirle a Claude que te explique mejor',
  ],
  html: `
  <section class="bloque">
    <h2>🚀 Los botones mágicos de este curso</h2>
    <p>En este curso vas a ver cuadros como el de abajo, con un borde de rayitas. Son <strong>frases para decirle a Claude</strong>.</p>
    <p>Tienen dos botones:</p>
    <ul>
      <li>🚀 <strong>Abrir en Claude</strong>: abre Claude con la frase <strong>ya escrita</strong>. Solo tienes que enviarla${dos(' con <kbd>Enter ↵</kbd>', ' con la <strong>flecha ⬆️</strong>')}.</li>
      <li>📋 <strong>Copiar</strong>: copia la frase. Después vas a Claude y ${PEGA}.</li>
    </ul>
    <p>Así <strong>no tienes que escribir nada</strong>. ¡Pruébalo!</p>
    ${pr('Hola Claude. Es mi primera vez usando inteligencia artificial. ¿Puedes contarme, con palabras muy sencillas, 5 cosas que puedes hacer para ayudarme?')}
    <div class="caja truco"><span class="titulo-caja">💡 Si la frase no aparece escrita</span>
    <p>A veces Claude abre vacío${dos('', ' (pasa mucho cuando se abre la app)')}. No pasa nada: la frase ya quedó copiada. Solo ${PEGA}.</p></div>
  </section>

  <section class="bloque">
    <h2>🎙️ Ahora con tu voz</h2>
    <p>Los botones son una ayuda, pero lo mejor es <strong>hablar con tus propias palabras</strong>.</p>
    <div class="pasos"><ol>
      <li>Abre Claude y toca <strong>"Nuevo chat"</strong>${dos('', ' (el lápiz ✏️ o el ➕ de arriba)')}.</li>
      <li>${dos('Haz clic', 'Toca')} en la caja de texto.</li>
      <li>${DICTA}.</li>
      <li>Habla. Por ejemplo: <em>"Hola Claude, me gusta el diseño gráfico. ¿Qué cosas bonitas puedo aprender a hacer contigo?"</em></li>
      <li>Revisa que se escribió y ${ENVIA}.</li>
      <li>Espera un poquito. Claude escribe su respuesta. 📝</li>
      <li>Lee la respuesta con calma. Si es muy larga, dile: <em>"Hazlo más corto."</em></li>
    </ol></div>
  </section>

  <section class="bloque">
    <h2>🤝 Cuéntale a Claude sobre ti</h2>
    <p>Claude te ayuda mejor si te conoce. Esta frase es muy útil al empezar un chat:</p>
    ${pr('Hola Claude. Te cuento sobre mí: estoy aprendiendo a usar la inteligencia artificial y me cuesta un poco aprender cosas nuevas. Tengo dificultad en mi mano derecha, así que escribo usando el dictado por voz. Por favor: 1) si ves errores de escritura, adivina lo que quise decir; 2) explícame con palabras sencillas y frases cortas; 3) dame un paso a la vez.')}
    <p>En la lección 8 vas a aprender a guardar esto <strong>para siempre</strong>, para no repetirlo.</p>
  </section>

  <section class="bloque">
    <h2>🔁 Si no entiendes, ¡pregunta otra vez!</h2>
    <p>Con Claude puedes preguntar <strong>todas las veces que quieras</strong>. No se cansa, no se enoja.</p>
    <p>Frases útiles para seguir la conversación:</p>
    <ul>
      <li>🗣️ <em>"No entendí. Explícamelo más fácil."</em></li>
      <li>🗣️ <em>"Dame un ejemplo."</em></li>
      <li>🗣️ <em>"Hazlo más corto."</em></li>
      <li>🗣️ <em>"¿Qué significa la palabra ...?"</em></li>
      <li>🗣️ <em>"Ahora el siguiente paso."</em></li>
    </ul>
    ${pr('No entendí bien. ¿Me lo explicas como si yo tuviera 10 años, con un ejemplo de la vida diaria?')}
  </section>

  <section class="bloque">
    <h2>🧹 ¿Nuevo chat o el mismo?</h2>
    <ul>
      <li>✅ <strong>Mismo chat</strong>: si sigues hablando del mismo tema. Claude recuerda lo que hablaron.</li>
      <li>🆕 <strong>Nuevo chat</strong>: si cambias de tema. Así Claude no se confunde.</li>
    </ul>
    <div class="caja truco"><span class="titulo-caja">💡 Más botones útiles</span>
    <p>Debajo de cada respuesta hay botoncitos${dos('', ' (en la app, a veces aparecen si dejas el dedo apretado sobre la respuesta)')}. Uno sirve para <strong>copiar</strong> la respuesta 📋 y otro para <strong>pedir otra respuesta distinta</strong> 🔄. Si no te gusta lo que dijo, ¡pide otra!</p></div>
  </section>

  ${videos(
    yt('cómo usar Claude AI primera conversación español', 'Tu primera conversación con Claude'),
    yt('Claude AI para principiantes paso a paso', 'Claude paso a paso para principiantes')
  )}
  `,
  mision: [
    'Usé el botón 🚀 "Abrir en Claude"',
    dos('Mandé un mensaje a Claude hablando con Windows + H', 'Mandé un mensaje a Claude hablando con el micrófono 🎤'),
    'Le conté a Claude sobre mí',
    'Le pedí a Claude que me explicara algo más fácil',
    'Empecé un chat nuevo',
  ],
},

/* ---------------------------------------------------------- 4 */
{
  emoji: '🍰', nivel: 40, etapa: '🚀 Aprendiendo a pedir', minutos: 30,
  titulo: 'La receta mágica para pedir cosas',
  aprenderas: [
    'La receta para que Claude te entienda perfecto',
    'Frases mágicas que mejoran cualquier respuesta',
    'Cómo hablarle largo y tranquilo con la voz',
  ],
  html: `
  <section class="bloque">
    <h2>🍰 La receta: QUIÉN + QUÉ + CÓMO</h2>
    <p>Para pedirle algo a Claude, piensa en una receta de 3 ingredientes:</p>
    <div class="pasos"><ol>
      <li><strong>🙋 QUIÉN soy / para qué es.</strong> <em>"Soy principiante en diseño..."</em></li>
      <li><strong>🎯 QUÉ quiero.</strong> <em>"...quiero ideas para un logo de una panadería..."</em></li>
      <li><strong>📐 CÓMO lo quiero.</strong> <em>"...dame 5 ideas cortas, en una lista."</em></li>
    </ol></div>
    <p>¡Con esos 3 ingredientes, Claude casi siempre te entiende!</p>
  </section>

  <section class="bloque">
    <h2>⚖️ Mira la diferencia</h2>
    <div class="compara">
      <div class="mal"><span class="etq">😕 Así no tanto</span>"Dame colores."</div>
      <div class="bien"><span class="etq">😃 ¡Así sí!</span>"Estoy diseñando un cartel para una fiesta de cumpleaños de una niña de 6 años. Dame 3 combinaciones de colores alegres, con el nombre de cada color y su código."</div>
    </div>
    <div class="compara">
      <div class="mal"><span class="etq">😕 Así no tanto</span>"Explícame la tipografía."</div>
      <div class="bien"><span class="etq">😃 ¡Así sí!</span>"Soy principiante en diseño gráfico. Explícame qué es la tipografía en 5 frases cortas y dame 2 ejemplos de dónde la veo todos los días."</div>
    </div>
    <p>¿Ves? La segunda tiene <strong>QUIÉN + QUÉ + CÓMO</strong>.</p>
  </section>

  <section class="bloque">
    <h2>✨ Frases mágicas</h2>
    <p>Puedes agregar estas frases a cualquier pedido:</p>
    <div class="tabla-scroll"><table class="tabla">
      <tr><th>Frase mágica</th><th>Para qué sirve</th></tr>
      <tr><td>"Explícamelo como a un niño de 10 años"</td><td>Respuestas fáciles</td></tr>
      <tr><td>"Paso a paso"</td><td>Instrucciones ordenadas</td></tr>
      <tr><td>"Dame 3 opciones"</td><td>Para elegir la que más te gusta</td></tr>
      <tr><td>"Hazme preguntas antes de empezar"</td><td>Claude pregunta lo que necesita saber</td></tr>
      <tr><td>"En una tabla"</td><td>Ordena la información</td></tr>
      <tr><td>"Máximo 5 frases"</td><td>Respuestas cortas</td></tr>
      <tr><td>"Un paso a la vez, espera que yo te diga listo"</td><td>Para no perderse</td></tr>
    </table></div>
    ${pr('Quiero aprender diseño gráfico desde cero. Antes de empezar, hazme 3 preguntas para conocerme mejor. Después de mis respuestas, propónme un plan de aprendizaje sencillo.')}
  </section>

  <section class="bloque">
    <h2>🎙️ Con la voz puedes hablar largo</h2>
    <p>Una ventaja de dictar es que puedes <strong>contar todo lo que piensas</strong>, como si le hablaras a un amigo. No tiene que estar ordenado. Claude lo ordena.</p>
    <p>Ejemplo de algo dicho con la voz, desordenado, y que funciona muy bien:</p>
    <div class="caja info"><p><em>"Oye Claude, mira, tengo un amigo que va a abrir una tienda de bicicletas, se llama algo así como Rueda Libre, y quiere un logo, no sé, algo con verde quizás, que se vea moderno pero no muy serio, ¿me ayudas con ideas? Dame unas cuatro."</em></p></div>
    <div class="caja truco"><span class="titulo-caja">💡 Truco</span>
    <p>Si dictaste algo largo y se te olvidó algo, <strong>no borres todo</strong>. Manda el mensaje y después di: <em>"Ah, se me olvidó decirte que..."</em></p></div>
  </section>

  <section class="bloque">
    <h2>🔁 Es una conversación, no un examen</h2>
    <p>La primera respuesta casi nunca es perfecta. <strong>¡Y está bien!</strong> Los expertos también hacen esto:</p>
    <ol>
      <li>Piden algo.</li>
      <li>Miran la respuesta.</li>
      <li>Piden cambios: <em>"Más alegre", "Menos texto", "Cambia la opción 2".</em></li>
      <li>Repiten hasta que les gusta.</li>
    </ol>
    ${pr('Me gustó la idea número 2. ¿Puedes darme 3 versiones diferentes de esa misma idea?')}
  </section>

  ${videos(
    yt('cómo escribir buenos prompts para IA principiantes español', 'Cómo pedir bien las cosas a la IA (prompts)'),
    yt('ingeniería de prompts explicada fácil español', 'Prompts explicados fácil'),
    web('https://docs.claude.com', 'Documentación oficial de Anthropic (avanzado, busca "prompt engineering")')
  )}
  `,
  mision: [
    'Hice un pedido con la receta QUIÉN + QUÉ + CÓMO',
    'Usé una frase mágica (por ejemplo "dame 3 opciones")',
    'Dicté un mensaje largo y desordenado y Claude me entendió',
    'Le pedí a Claude cambios a su respuesta',
  ],
},

/* ---------------------------------------------------------- 5 */
{
  emoji: '👀', nivel: 50, etapa: '🚀 Aprendiendo a pedir', minutos: 30,
  titulo: 'Claude ve fotos, lee archivos y busca en internet',
  aprenderas: [
    'Mostrarle fotos y capturas de pantalla a Claude',
    'Pedirle que lea documentos por ti',
    'Usar la búsqueda en internet',
  ],
  html: `
  <section class="bloque">
    <h2>📸 Claude puede mirar fotos</h2>
    <p>Puedes mostrarle una foto a Claude y preguntarle cosas sobre ella. ¡Es muy útil para el diseño!</p>
    <div class="pasos"><ol>
      <li>En Claude, toca el botón <strong>➕</strong> (al lado de la caja de texto).</li>
      <li>Elige ${dos('<strong>subir archivo</strong> o <strong>foto</strong>', '<strong>Fotos</strong> (o <strong>Galería</strong>) para elegir una imagen, o la <strong>cámara 📷</strong> para sacar una foto ahora')}.</li>
      <li>${dos('Busca la imagen en tu computadora y elígela.', 'Toca la imagen que quieres.')}</li>
      <li>Di lo que quieres saber, por ejemplo: <em>"¿Qué colores tiene esta imagen?"</em></li>
      <li>${ENVIA.replace('envía', 'Envía').replace('envía', 'Envía')}.</li>
    </ol></div>
    <div class="caja truco solo-pc"><span class="titulo-caja">💡 Más fácil: arrastra</span>
    <p>También puedes <strong>arrastrar</strong> una imagen con el mouse y soltarla encima de la caja de Claude.</p></div>
    <div class="caja truco solo-pc"><span class="titulo-caja">📱 En el teléfono</span>
    <p>En la app, toca ➕ y luego la <strong>cámara 📷</strong>. Saca una foto de lo que quieras y pregúntale a Claude. ¡Una planta, un cartel, un dibujo tuyo!</p></div>
  </section>

  <section class="bloque">
    <h2>✂️ Capturas de pantalla</h2>
    <p>Una <strong>captura</strong> es una foto de lo que ves en tu pantalla. Sirve para mostrarle a Claude algo que estás viendo.</p>
    <div class="solo-movil">
      <div class="solo-android">
        <p><strong>Con los botones:</strong> aprieta <strong>encendido + bajar volumen</strong> al mismo tiempo.</p>
        <p><strong>✋ Con una mano (más fácil):</strong> di <em>"Ok Google, haz una captura de pantalla"</em>. Muchos teléfonos también dejan hacerla <strong>deslizando 3 dedos hacia abajo</strong> (búscalo en Ajustes como <em>"captura"</em>).</p>
      </div>
      <div class="solo-ios">
        <p><strong>Con los botones:</strong> aprieta <strong>botón lateral + subir volumen</strong> al mismo tiempo.</p>
        <p><strong>✋ Con una mano (más fácil):</strong> activa <strong>"Tocar atrás"</strong>: <strong>Ajustes → Accesibilidad → Tocar → Tocar atrás → Doble toque → Captura de pantalla</strong>. ¡Después solo das dos golpecitos en la parte de atrás del teléfono!</p>
      </div>
      <p>Después, en Claude toca <strong>➕</strong> → <strong>Fotos</strong> y elige la captura. Es la última foto.</p>
    </div>
    <div class="teclas solo-pc"><kbd>⊞ Windows</kbd> + <kbd>Shift ⇧</kbd> + <kbd>S</kbd></div>
    <ol class="solo-pc">
      <li>Aprieta esas teclas (con las teclas especiales de la lección 1 puedes apretarlas una por una).</li>
      <li>La pantalla se pone oscura. Arrastra el mouse para elegir lo que quieres capturar.</li>
      <li>Ve a Claude y pega con <kbd>Ctrl</kbd> + <kbd>V</kbd>. ¡La imagen aparece!</li>
    </ol>
  </section>

  <section class="bloque">
    <h2>🎨 Ideas para usar fotos</h2>
    ${pr('Mira esta imagen. ¿Qué colores principales tiene? Dame los códigos de color y un nombre bonito para cada uno.')}
    ${pr('Este es un diseño que hice. Dime 3 cosas que están bien y 3 cosas que podría mejorar. Sé amable y explícame por qué.')}
    ${pr('¿Qué tipo de letra (tipografía) se parece a la de esta imagen? Recomiéndame letras gratis parecidas de Google Fonts.')}
    ${pr('No entiendo lo que dice esta pantalla. Explícame qué tengo que hacer, paso a paso.')}
  </section>

  <section class="bloque">
    <h2>📄 Claude lee documentos</h2>
    <p>Con el mismo botón <strong>➕</strong> puedes subir documentos: <strong>PDF, Word, textos</strong>. Claude los lee en segundos.</p>
    <ul>
      <li>🗣️ <em>"Resúmeme este documento en 5 puntos fáciles."</em></li>
      <li>🗣️ <em>"¿Qué dice este documento sobre las fechas?"</em></li>
      <li>🗣️ <em>"Explícame las palabras difíciles de este texto."</em></li>
    </ul>
    <div class="caja bien"><p>Esto es súper útil si leer mucho te cansa. ¡Claude lee por ti y te cuenta lo importante!</p></div>
  </section>

  <section class="bloque">
    <h2>🌍 Claude busca en internet</h2>
    <p>Claude puede <strong>buscar en internet</strong> información nueva, como noticias o precios.</p>
    <p>Normalmente lo hace solo cuando hace falta. Si no lo hace, pídeselo:</p>
    ${pr('Busca en internet cuáles son las tendencias de diseño gráfico de este año y explícamelas con palabras simples.')}
    <div class="caja info"><span class="titulo-caja">🔧 Si no busca</span>
    <p>Puede que la búsqueda esté apagada. Busca en la caja de Claude un botón de herramientas o el ➕, y activa <strong>"Búsqueda web"</strong>.</p></div>
  </section>

  <section class="bloque">
    <h2>🙅 Lo que no puede</h2>
    <ul>
      <li>No puede ver <strong>videos</strong> (solo imágenes).</li>
      <li>A veces <strong>se equivoca</strong> al leer imágenes borrosas o letras chiquitas.</li>
      <li>No subas fotos de <strong>documentos privados</strong> (carnet, tarjetas del banco). Lo veremos en la lección final.</li>
    </ul>
  </section>

  ${videos(
    yt('Claude AI subir imágenes y PDF tutorial español', 'Subir imágenes y documentos a Claude'),
    yt('captura de pantalla Windows Shift S recortes tutorial', 'Cómo hacer capturas de pantalla en Windows'),
    yt('Claude búsqueda web tutorial español', 'Búsqueda en internet con Claude')
  )}
  `,
  mision: [
    'Le mostré una foto a Claude y le pregunté algo',
    dos('Hice una captura de pantalla y la pegué en Claude', 'Hice una captura de pantalla y se la mostré a Claude'),
    'Le pedí a Claude que me resumiera un documento',
    'Le pedí a Claude que buscara algo en internet',
  ],
},

/* ---------------------------------------------------------- 6 */
{
  emoji: '🛠️', nivel: 60, etapa: '🎨 Creando cosas', minutos: 35,
  titulo: 'Artefactos: Claude construye cosas',
  aprenderas: [
    'Qué es un "artefacto"',
    'Pedirle a Claude que cree páginas, juegos y tarjetas',
    'Cambiar lo que creó, solo hablando',
  ],
  html: `
  <section class="bloque">
    <h2>🧱 ¿Qué es un artefacto?</h2>
    <p>A veces Claude no solo <strong>responde</strong>: <strong>construye algo</strong>. Eso que construye se llama <strong>artefacto</strong>.</p>
    <p>Aparece en una <strong>ventana al lado</strong> del chat. Puede ser:</p>
    <ul>
      <li>🌐 Una página web</li>
      <li>🎮 Un juego sencillo</li>
      <li>🎂 Una tarjeta animada</li>
      <li>🎨 Un dibujo o logo (hecho con formas)</li>
      <li>📄 Un documento</li>
    </ul>
    <div class="caja bien"><span class="titulo-caja">✅ No necesitas saber programar</span>
    <p>Claude escribe el "código" (las instrucciones para la computadora) por ti. Tú solo dices lo que quieres.</p></div>
  </section>

  <section class="bloque">
    <h2>🎮 Prueba: crea un juego</h2>
    ${pr('Crea un juego de memoria sencillo con 8 pares de cartas. Cada carta tiene un color bonito. Que las cartas sean grandes y fáciles de tocar. Cuando gane, que aparezca un mensaje de felicitaciones.')}
    <p>Espera un poquito... ¡y juega! 🎉 Si no ves el juego, busca un botón que diga <strong>"Vista previa"</strong> o <strong>"Preview"</strong>.</p>
    <div class="caja info solo-movil"><span class="titulo-caja">📱 En el teléfono</span>
    <p>El artefacto aparece como una <strong>tarjeta</strong> dentro del chat. Tócala y se abre en <strong>pantalla completa</strong>. Para volver al chat, toca la flecha ← o la ✕ de arriba.</p></div>
  </section>

  <section class="bloque">
    <h2>🗣️ Cámbialo hablando</h2>
    <p>Lo mejor: puedes pedir cambios <strong>con la voz</strong>, como si hablaras con un diseñador.</p>
    <ul>
      <li>🗣️ <em>"Cambia los colores a tonos pastel."</em></li>
      <li>🗣️ <em>"Haz las letras más grandes."</em></li>
      <li>🗣️ <em>"Ponle un contador de intentos."</em></li>
      <li>🗣️ <em>"Que las cartas tengan animales en vez de colores."</em></li>
    </ul>
    <div class="caja truco"><span class="titulo-caja">💡 Un cambio a la vez</span>
    <p>Pide los cambios de a poquito. Si algo se rompe, di: <em>"Eso no funcionó, vuelve a la versión anterior."</em></p></div>
  </section>

  <section class="bloque">
    <h2>✨ Más ideas para crear</h2>
    ${pr('Crea una tarjeta de cumpleaños animada para mi mamá. Que tenga flores, colores cálidos y el mensaje "Feliz cumpleaños, mamá".')}
    ${pr('Crea una página web de presentación para mí. Soy un diseñador gráfico que está empezando. Que sea moderna, con colores bonitos y un espacio para mostrar mis trabajos. Hazme preguntas antes de empezar.')}
    ${pr('Crea una herramienta para elegir paletas de colores: que tenga un botón grande que genere 5 colores armónicos al azar y muestre sus códigos.')}
    ${pr('Crea un póster digital de un concierto de rock imaginario. Usa formas geométricas, colores intensos y letras grandes.')}
  </section>

  <section class="bloque">
    <h2>💾 Guardar y compartir</h2>
    <p>Arriba del artefacto hay botones. Pueden cambiar un poco, pero normalmente puedes:</p>
    <ul>
      <li>📋 <strong>Copiar</strong> el código.</li>
      <li>⬇️ <strong>Descargar</strong> el archivo a tu computadora.</li>
      <li>🔗 <strong>Publicar</strong>: Claude te da un link para mandarlo por WhatsApp a quien quieras.</li>
    </ul>
    <div class="caja info"><p>Si no encuentras algún botón, pregúntale a Claude: <em>"¿Cómo descargo esto?"</em> 😉</p></div>
  </section>

  ${videos(
    yt('Claude artifacts tutorial español', 'Artefactos de Claude (tutorial)'),
    yt('crear juego con Claude sin programar', 'Crear un juego con Claude sin saber programar'),
    yt('Claude artifacts ideas ejemplos', 'Ideas y ejemplos de artefactos')
  )}
  `,
  mision: [
    'Creé un juego con Claude',
    'Le pedí 3 cambios con la voz',
    'Creé algo para regalarle a alguien (tarjeta, póster...)',
    'Compartí o descargué un artefacto',
  ],
},

/* ---------------------------------------------------------- 7 */
{
  emoji: '🎨', nivel: 70, etapa: '🎨 Creando cosas', minutos: 45,
  titulo: 'Diseño gráfico con IA',
  aprenderas: [
    'Cómo Claude te ayuda a diseñar (ideas, colores, letras, logos)',
    'Herramientas gratis para crear imágenes con IA',
    'Un método para crear tus diseños de principio a fin',
  ],
  html: `
  <section class="bloque">
    <h2>🎨 Claude, tu compañero de diseño</h2>
    <p>Claude puede ser como un <strong>profesor y compañero de diseño</strong> que está contigo todo el día. Te ayuda con:</p>
    <ul>
      <li>💡 <strong>Ideas</strong>: lluvia de ideas para logos, carteles, nombres.</li>
      <li>🌈 <strong>Colores</strong>: paletas con sus códigos (como <code>#FF6B35</code>).</li>
      <li>🔤 <strong>Letras (tipografía)</strong>: qué letras combinan bien.</li>
      <li>🔷 <strong>Logos e íconos</strong>: los dibuja con formas (en artefactos).</li>
      <li>🧐 <strong>Opinión</strong>: le muestras tu diseño y te dice cómo mejorarlo.</li>
      <li>📚 <strong>Clases</strong>: te enseña teoría del color, composición, etc.</li>
    </ul>
    <div class="caja info"><span class="titulo-caja">ℹ️ Algo importante</span>
    <p>Claude <strong>no pinta fotos realistas</strong> ni ilustraciones como un pintor. Sus dibujos los hace con <strong>formas y código</strong> (logos, íconos, carteles simples). Para imágenes tipo foto o ilustración, usaremos otras herramientas gratis. ¡Las vemos abajo!</p></div>
  </section>

  <section class="bloque">
    <h2>📚 Clases de diseño con Claude</h2>
    <p>Pídele a Claude que sea tu profesor. Una lección corta por día:</p>
    ${pr('Quiero que seas mi profesor de diseño gráfico. Soy principiante y me cuesta un poco aprender, así que usa palabras sencillas. Enséñame la teoría del color en 5 lecciones muy cortas. Dame solo la lección 1 y espera a que yo te diga "siguiente".')}
    <p>Temas que puedes pedirle después:</p>
    <ul>
      <li>🔤 Tipografía (tipos de letra)</li>
      <li>📐 Composición (cómo ordenar las cosas en un diseño)</li>
      <li>⚪ Espacio en blanco</li>
      <li>🏷️ Cómo se hace un logo</li>
      <li>🧩 Diseño de marca (identidad visual)</li>
    </ul>
  </section>

  <section class="bloque">
    <h2>🌈 Colores y letras</h2>
    ${pr('Crea una paleta de 5 colores para una marca de café artesanal que sea cálida y acogedora. Muéstramela como un artefacto con cuadros de colores grandes, el código de cada color y para qué usar cada uno.')}
    ${pr('Recomiéndame 3 combinaciones de letras gratis de Google Fonts para un póster moderno. Para cada una, dime cuál uso en el título y cuál en el texto, y muéstrame un ejemplo como artefacto.')}
  </section>

  <section class="bloque">
    <h2>🔷 Logos con Claude</h2>
    <p>Claude puede dibujar logos sencillos en un formato llamado <strong>SVG</strong> (un dibujo hecho con formas que se puede agrandar sin perder calidad).</p>
    ${pr('Quiero un logo para una tienda de plantas que se llama "Hoja Verde". Hazme 4 propuestas diferentes en SVG, simples y modernas, una al lado de la otra en un artefacto. Explícame la idea de cada una.')}
    <p>Después puedes decir: <em>"Me gusta la 3. Hazla más redondeada y prueba con un verde más oscuro."</em></p>
    <div class="caja truco"><span class="titulo-caja">💡 Usar el logo en otros programas</span>
    <p>${dos('Descarga el SVG y ábrelo en <strong>Canva</strong>, <strong>Inkscape</strong> (gratis) o <strong>Figma</strong> (tiene versión gratis) para seguir editándolo.', 'Descarga el SVG y súbelo a la app de <strong>Canva</strong> (gratis) para seguir editándolo. Para editar logos con más detalle, es mejor la computadora.')}</p></div>
  </section>

  <section class="bloque">
    <h2>🖼️ Herramientas gratis para crear imágenes</h2>
    <p>Estas herramientas <strong>crean imágenes</strong> a partir de lo que les describes. Todas tienen una <strong>versión gratis</strong> (con límites por día).</p>
    <div class="tabla-scroll"><table class="tabla">
      <tr><th>Herramienta</th><th>Sirve para</th></tr>
      <tr><td><strong>Canva</strong></td><td>Diseñar todo: posts, carteles, presentaciones. Tiene plantillas y algo de IA.</td></tr>
      <tr><td><strong>Microsoft Designer</strong></td><td>Crear imágenes con IA usando tu cuenta Microsoft.</td></tr>
      <tr><td><strong>Ideogram</strong></td><td>Imágenes con <strong>texto escrito dentro</strong> (carteles, logos con letras).</td></tr>
      <tr><td><strong>Adobe Express / Firefly</strong></td><td>Imágenes y diseños de Adobe (los de Photoshop).</td></tr>
      <tr><td><strong>Google Fonts</strong></td><td>Cientos de tipos de letra gratis.</td></tr>
      <tr><td><strong>Coolors</strong></td><td>Crear y guardar paletas de colores.</td></tr>
    </table></div>
    <div class="caja info"><p>Estas herramientas cambian seguido sus precios y límites. Si una te pide pagar, prueba otra. Puedes preguntarle a Claude: <em>"¿Qué herramientas gratis hay hoy para crear imágenes con IA?"</em></p></div>
  </section>

  <section class="bloque">
    <h2>🤝 Claude escribe la descripción por ti</h2>
    <p>Para crear imágenes con IA hay que <strong>describir muy bien</strong> lo que quieres. ¡Claude es experto en eso!</p>
    ${pr('Quiero crear una imagen con IA para un póster: un gato astronauta flotando en el espacio, estilo ilustración colorida. Escríbeme 3 descripciones (prompts) detalladas para usar en un generador de imágenes. Incluye estilo, colores, luz y composición.')}
    <p>Copias la descripción que te dio Claude, la pegas en Microsoft Designer o Ideogram, y ¡listo! 🐱🚀</p>
  </section>

  <section class="bloque">
    <h2>🔄 El método del diseñador con IA</h2>
    <p>Así trabajan muchos diseñadores hoy:</p>
    <div class="pasos"><ol>
      <li><strong>💡 Idea</strong> — Le cuentas a Claude qué necesitas y te da ideas.</li>
      <li><strong>✍️ Descripción</strong> — Claude escribe la descripción para el generador de imágenes.</li>
      <li><strong>🖼️ Imagen</strong> — La creas en Designer, Ideogram o Firefly.</li>
      <li><strong>🧐 Opinión</strong> — Le muestras la imagen a Claude y te dice cómo mejorarla.</li>
      <li><strong>✨ Final</strong> — Armas el diseño final en Canva: agregas letras, logo y colores.</li>
    </ol></div>
  </section>

  <section class="bloque">
    <h2>🏆 Proyectos para practicar</h2>
    <ol>
      <li>Tu <strong>logo personal</strong> (con tus iniciales).</li>
      <li>Un <strong>post de Instagram</strong> sobre algo que te guste.</li>
      <li>Un <strong>cartel</strong> para un evento imaginario.</li>
      <li>La <strong>marca completa</strong> de un negocio inventado: nombre, logo, colores y letras.</li>
      <li>Tu <strong>portafolio</strong>: una página web con tus trabajos (¡como en la lección 6!).</li>
    </ol>
    ${pr('Quiero practicar diseño gráfico. Invéntame un cliente imaginario con un negocio, cuéntame qué necesita (como si fuera un encargo real) y guíame paso a paso para hacer su logo y su paleta de colores.')}
  </section>

  <section class="bloque">
    <h2>🤔 Ser un diseñador honesto</h2>
    <ul>
      <li>🙅 No copies el trabajo de otros artistas. Inspírate, pero crea lo tuyo.</li>
      <li>🗣️ Si usaste IA para un trabajo, es bueno decirlo.</li>
      <li>🧠 La IA ayuda, pero <strong>tu gusto y tus decisiones</strong> son lo que hace bueno un diseño.</li>
    </ul>
  </section>

  ${videos(
    yt('teoría del color para principiantes diseño gráfico', 'Teoría del color para principiantes'),
    yt('tipografía para principiantes diseño gráfico español', 'Tipografía para principiantes'),
    yt('Canva tutorial principiantes español', 'Canva para principiantes'),
    yt('Microsoft Designer crear imágenes con IA gratis tutorial', 'Microsoft Designer: imágenes con IA gratis'),
    yt('Ideogram tutorial español', 'Ideogram: imágenes con texto'),
    yt('Claude IA para diseñadores gráficos', 'Claude para diseñadores'),
    web('https://www.canva.com', 'Canva'),
    web('https://designer.microsoft.com', 'Microsoft Designer'),
    web('https://ideogram.ai', 'Ideogram'),
    web('https://fonts.google.com', 'Google Fonts (letras gratis)'),
    web('https://coolors.co', 'Coolors (paletas de colores)'),
    web('https://inkscape.org/es/', 'Inkscape (editar SVG, gratis)')
  )}
  `,
  mision: [
    'Tomé la lección 1 de teoría del color con Claude',
    'Creé una paleta de colores con Claude',
    'Claude me hizo un logo en SVG y le pedí cambios',
    'Creé una imagen con una herramienta gratis usando una descripción de Claude',
    'Le mostré un diseño mío a Claude y le pedí su opinión',
  ],
},

/* ---------------------------------------------------------- 8 */
{
  emoji: '🗂️', nivel: 80, etapa: '🏆 Nivel experto', minutos: 35,
  titulo: 'Organízate: preferencias, proyectos y modo voz',
  aprenderas: [
    'Hacer que Claude recuerde cómo te gusta que te hable',
    'Ordenar tu trabajo en proyectos',
    'Conversar con Claude en voz alta, sin escribir nada',
  ],
  html: `
  <section class="bloque">
    <h2>⚙️ Tus preferencias: díselo una sola vez</h2>
    <p>¿Te acuerdas de la frase de la lección 3 donde le contabas a Claude sobre ti? Puedes <strong>guardarla</strong> para que Claude la sepa <strong>en todos los chats</strong>.</p>
    <div class="pasos"><ol>
      <li>${dos('En Claude, toca tu <strong>nombre o tu inicial</strong> (abajo a la izquierda).', 'En la app, abre el <strong>menú ☰</strong> y toca tu <strong>nombre o tu inicial</strong>.')}</li>
      <li>Entra a <strong>Configuración</strong> (o "Ajustes").</li>
      <li>Busca la parte que pregunta qué <strong>preferencias personales</strong> debe tener en cuenta Claude.</li>
      <li>Pega o dicta tu texto. Por ejemplo, el de abajo 👇.</li>
      <li>Guarda.</li>
    </ol></div>
    ${pr('Uso el dictado por voz porque tengo dificultad en la mano derecha, así que mis mensajes pueden tener errores: adivina lo que quise decir. Estoy aprendiendo y me ayuda que expliques con palabras sencillas, frases cortas y un paso a la vez. Me gusta mucho el diseño gráfico.')}
    <div class="caja info"><p>Los nombres de los menús pueden cambiar un poco. Si no lo encuentras, pregúntale a Claude: <em>"¿Dónde configuro mis preferencias personales?"</em></p></div>
  </section>

  <section class="bloque">
    <h2>🧠 La memoria de Claude</h2>
    <p>Claude puede <strong>recordar cosas de conversaciones anteriores</strong> si tienes la memoria activada (está en Configuración). Así no tienes que repetir todo.</p>
    <p>Puedes preguntarle: <em>"¿Qué recuerdas de mí?"</em></p>
    <div class="caja info"><p>Esta función puede estar o no estar en el plan gratis, dependiendo del momento. Si no la ves, no te preocupes: las preferencias del paso anterior hacen casi lo mismo.</p></div>
  </section>

  <section class="bloque">
    <h2>🗂️ Proyectos: carpetas inteligentes</h2>
    <p>Un <strong>proyecto</strong> es como una <strong>carpeta</strong> para un tema. Adentro guardas:</p>
    <ul>
      <li>💬 Los chats de ese tema.</li>
      <li>📎 Archivos (fotos, documentos) que Claude usa siempre en ese proyecto.</li>
      <li>📜 <strong>Instrucciones</strong>: cómo quieres que Claude se comporte ahí.</li>
    </ul>
    <p><strong>Ejemplo:</strong> un proyecto llamado <em>"Mi escuela de diseño"</em> con estas instrucciones:</p>
    ${pr('En este proyecto eres mi profesor de diseño gráfico. Soy principiante. Explica con palabras sencillas y ejemplos visuales. Al final de cada respuesta, propónme un ejercicio pequeño para practicar.')}
    <div class="pasos"><ol>
      <li>${dos('En la barra de la izquierda', 'En el menú ☰')}, busca <strong>"Proyectos"</strong>.</li>
      <li>Toca <strong>"Crear proyecto"</strong> o <strong>"Nuevo proyecto"</strong>.</li>
      <li>Ponle un nombre (¡díctalo!).</li>
      <li>Busca <strong>"Instrucciones"</strong> y pega el texto de arriba.</li>
      <li>Empieza un chat dentro del proyecto.</li>
    </ol></div>
    <div class="caja info"><p>En el plan gratis puede haber un límite de cuántos proyectos puedes crear. ¡Con uno o dos ya es genial!</p></div>
  </section>

  <section class="bloque">
    <h2>✍️ Estilos de respuesta</h2>
    <p>Claude puede responder en distintos <strong>estilos</strong>: más corto, más explicado, más formal... Busca en la caja de texto un botón de estilos o el ➕. Prueba el estilo <strong>"Explicativo"</strong> para aprender, o <strong>"Conciso"</strong> para respuestas cortas.</p>
  </section>

  <section class="bloque">
    <h2>🗣️ Modo voz: ¡conversar hablando!</h2>
    <p>En la <strong>app del teléfono</strong>, Claude tiene un <strong>modo voz</strong>: tú hablas, y <strong>Claude te responde hablando</strong>. ¡Como una llamada!</p>
    <div class="pasos"><ol>
      <li>Abre la app de Claude en el teléfono.</li>
      <li>Al lado de la caja de texto, busca un botón con <strong>ondas de sonido</strong> 〰️ (no es el micrófono del teclado).</li>
      <li>Tócalo y habla. Claude te escucha y te contesta en voz alta.</li>
      <li>Para terminar, toca el botón de salir o la ✕.</li>
    </ol></div>
    <div class="caja truco"><span class="titulo-caja">💡 Ideal para practicar</span>
    <p>Puedes usar el modo voz mientras caminas o descansas. Por ejemplo: <em>"Hazme un quiz de 5 preguntas sobre los colores primarios y secundarios."</em></p></div>
    <div class="caja info solo-pc"><p>En la computadora también puede haber un micrófono 🎤 en la caja de Claude para dictar directo. Si lo ves, ¡úsalo en vez de Windows + H!</p></div>
    <div class="caja bien solo-movil"><span class="titulo-caja">📱 ¡Estás en el lugar perfecto!</span><p>Como estás en el teléfono, puedes probarlo ahora mismo. Es la forma más cómoda de usar Claude sin escribir nada.</p></div>
  </section>

  <section class="bloque">
    <h2>🔍 Encontrar chats viejos</h2>
    <ul>
      <li>🔎 Usa la <strong>búsqueda</strong> ${dos('en la barra de la izquierda', 'dentro del menú ☰')}.</li>
      <li>⭐ Marca con <strong>estrella</strong> los chats importantes para tenerlos arriba.</li>
      <li>✏️ <strong>Cambia el nombre</strong> a un chat para encontrarlo fácil.</li>
    </ul>
  </section>

  ${videos(
    yt('Claude proyectos tutorial español', 'Proyectos en Claude'),
    yt('Claude modo voz app tutorial', 'Modo voz de Claude en el teléfono'),
    yt('Claude memoria preferencias configuración tutorial', 'Memoria y preferencias de Claude')
  )}
  `,
  mision: [
    'Guardé mis preferencias personales en Configuración',
    'Creé un proyecto con instrucciones',
    'Probé el modo voz en el teléfono',
    'Le puse estrella a un chat importante',
  ],
},

/* ---------------------------------------------------------- 9 */
{
  emoji: '🌌', nivel: 90, etapa: '🏆 Nivel experto', minutos: 30,
  titulo: 'El universo Claude: Code, Design y más',
  aprenderas: [
    'Todas las "versiones" y herramientas de Claude',
    'Qué es Claude Code y Claude Design',
    'Qué puedes usar gratis y qué necesita un plan de pago',
  ],
  html: `
  <section class="bloque">
    <h2>🌌 Claude es más que un chat</h2>
    <p>Hasta ahora usaste el <strong>chat de Claude</strong>. Pero Anthropic tiene <strong>más herramientas</strong>. Imagina una caja de herramientas 🧰: cada una sirve para algo distinto.</p>
    <div class="caja info"><span class="titulo-caja">💳 Importante</span>
    <p>Varias de estas herramientas <strong>necesitan un plan de pago</strong> (como Pro). En esta lección solo las vamos a <strong>conocer</strong>. Cuando te sientas listo, puedes probar un mes de Pro y usarlas.</p></div>
    <div class="caja ojo"><span class="titulo-caja">🔄 Las cosas cambian rápido</span>
    <p>La IA cambia muy rápido. Puede que alguna herramienta tenga otro nombre, sea gratis o haya una nueva. Pregúntale a Claude: <em>"¿Qué productos tiene Anthropic hoy y cuáles son gratis?"</em></p></div>
  </section>

  <section class="bloque">
    <h2>🧰 La caja de herramientas</h2>
    <div class="tabla-scroll"><table class="tabla">
      <tr><th>Herramienta</th><th>¿Qué hace?</th><th>¿Gratis?</th></tr>
      <tr><td>💬 <strong>Claude (chat)</strong><br>web, Windows, teléfono</td><td>Conversar, crear, aprender. Lo que usaste todo el curso.</td><td>✅ Sí, con límites</td></tr>
      <tr><td>👨‍💻 <strong>Claude Code</strong></td><td>Un Claude que <strong>trabaja en tu computadora</strong>: crea programas, páginas web y archivos de verdad.</td><td>💳 Plan de pago</td></tr>
      <tr><td>🎨 <strong>Claude Design</strong></td><td>Crear diseños visuales, prototipos de apps y presentaciones conversando.</td><td>💳 Plan de pago</td></tr>
      <tr><td>🌐 <strong>Claude en Chrome</strong></td><td>Una extensión del navegador: Claude <strong>usa páginas web por ti</strong> (busca, llena formularios...).</td><td>💳 Plan de pago</td></tr>
      <tr><td>🔌 <strong>Conectores</strong></td><td>Conectan Claude con otras apps: Google Drive, Gmail, Calendario, Canva y más.</td><td>Algunos ✅</td></tr>
      <tr><td>🧩 <strong>Skills (habilidades)</strong></td><td>"Recetas" que le enseñan a Claude a hacer tareas especiales (crear Excel, PowerPoint...).</td><td>Depende</td></tr>
      <tr><td>⚙️ <strong>API</strong></td><td>Para programadores que quieren poner a Claude dentro de sus propias apps.</td><td>💳 Se paga por uso</td></tr>
    </table></div>
  </section>

  <section class="bloque">
    <h2>👨‍💻 Claude Code, explicado fácil</h2>
    <p>Imagina que quieres hacer un pastel 🎂:</p>
    <ul>
      <li>💬 <strong>Claude normal</strong> te da la <strong>receta</strong>. Tú cocinas.</li>
      <li>👨‍🍳 <strong>Claude Code</strong> <strong>entra a la cocina y cocina contigo</strong>. Abre los cajones, mezcla, hornea... y te pregunta antes de hacer algo importante.</li>
    </ul>
    <p>Claude Code puede crear y cambiar archivos en tu computadora, armar páginas web completas, ordenar carpetas y mucho más. Se usa en la app de escritorio de Claude, en la web o en una ventana de comandos (la "terminal").</p>
    <div class="caja bien"><span class="titulo-caja">🤩 ¿Sabías que...?</span>
    <p><strong>¡Este curso lo creó Claude Code!</strong> Tu amigo le pidió con palabras lo que quería, y Claude Code escribió todas las páginas, los botones y los colores.</p></div>
    <div class="caja truco"><span class="titulo-caja">💡 Practica gratis</span>
    <p>Los <strong>artefactos</strong> (lección 6) son como un "mini Claude Code" gratis. Si te gustó crear juegos y páginas, ¡Claude Code te va a encantar!</p></div>
  </section>

  <section class="bloque">
    <h2>🎨 Claude Design, para ti que te gusta diseñar</h2>
    <p>Claude Design es una herramienta de Anthropic pensada para <strong>crear cosas visuales</strong> conversando: diseños, prototipos de apps y páginas, presentaciones.</p>
    <p>Le describes lo que quieres (¡con la voz!) y lo va armando. Después le pides cambios, como con los artefactos, pero con más herramientas de diseño.</p>
    <p>Mientras tanto, <strong>todo lo que aprendiste en las lecciones 6 y 7 es el entrenamiento perfecto</strong> para usarlo después.</p>
  </section>

  <section class="bloque">
    <h2>🔌 Conectores: Claude + tus apps</h2>
    <p>Los conectores dejan que Claude <strong>use otras apps</strong>. Por ejemplo:</p>
    <ul>
      <li>📁 Leer tus archivos de <strong>Google Drive</strong>.</li>
      <li>📅 Revisar tu <strong>calendario</strong>.</li>
      <li>🎨 Trabajar con tus diseños de <strong>Canva</strong>.</li>
    </ul>
    <p>Búscalos en <strong>Configuración → Conectores</strong> (o en el ➕ de la caja de texto).</p>
    <div class="caja ojo"><p>Antes de conectar una app, piensa: ¿quiero que Claude vea esto? Conecta solo lo que necesites.</p></div>
  </section>

  <section class="bloque">
    <h2>❓ Pregúntale a Claude sobre Claude</h2>
    ${pr('Explícame con palabras sencillas qué es Claude Code y dame 5 ejemplos de cosas que podría hacer con él una persona que aprende diseño gráfico.')}
    ${pr('¿Qué productos y herramientas tiene Anthropic hoy? Haz una tabla con: nombre, para qué sirve, y si se puede usar gratis.')}
  </section>

  ${videos(
    yt('qué es Claude Code explicado español', '¿Qué es Claude Code?'),
    yt('Claude Code para principiantes sin saber programar', 'Claude Code para principiantes'),
    yt('Claude Design Anthropic tutorial', 'Claude Design'),
    yt('Claude en Chrome extensión tutorial', 'Claude en Chrome'),
    yt('Claude conectores Google Drive Canva tutorial', 'Conectores de Claude'),
    web('https://www.anthropic.com/learn', 'Anthropic Academy: cursos gratis oficiales (en inglés, se pueden traducir)'),
    web('https://www.anthropic.com/claude', 'Página oficial de Claude')
  )}
  `,
  mision: [
    'Puedo explicar qué es Claude Code con el ejemplo del pastel',
    'Vi un video de Claude Code o Claude Design',
    'Le pedí a Claude la tabla de productos de Anthropic',
    'Elegí cuál herramienta me gustaría probar en el futuro',
  ],
},

/* ---------------------------------------------------------- 10 */
{
  emoji: '🎓', nivel: 100, etapa: '🏆 Nivel experto', minutos: 25,
  titulo: 'Seguro, inteligente... ¡y graduado!',
  aprenderas: [
    'Cómo usar la IA de forma segura',
    'Cuándo NO creerle a la IA',
    'Tu plan para seguir aprendiendo... ¡y tu diploma!',
  ],
  html: `
  <section class="bloque">
    <h2>🔒 Lo que nunca le das a una IA</h2>
    <ul>
      <li>🚫 <strong>Contraseñas</strong>.</li>
      <li>🚫 Números de <strong>tarjetas del banco</strong> o claves.</li>
      <li>🚫 Fotos de tu <strong>carnet o documentos</strong>.</li>
      <li>🚫 Datos privados de <strong>otras personas</strong>.</li>
    </ul>
    <div class="caja ojo"><span class="titulo-caja">⚠️ Regla de oro</span>
    <p>Si no se lo dirías a un desconocido, <strong>no se lo digas a la IA</strong>.</p></div>
  </section>

  <section class="bloque">
    <h2>🤥 La IA a veces inventa</h2>
    <p>A veces la IA dice algo <strong>falso pero muy seguro</strong>. Eso se llama <strong>"alucinación"</strong>.</p>
    <p>Por eso:</p>
    <ul>
      <li>✅ Para cosas importantes (<strong>salud, dinero, trámites, leyes</strong>), confirma con una persona experta.</li>
      <li>✅ Pídele a Claude: <em>"¿Estás seguro? ¿De dónde sacaste eso?"</em></li>
      <li>✅ Si buscó en internet, revisa los <strong>links</strong> que te muestra.</li>
    </ul>
    ${pr('Revisa tu respuesta anterior. ¿Hay algo de lo que no estés seguro o que yo debería confirmar con otra fuente?')}
  </section>

  <section class="bloque">
    <h2>🎣 Cuidado con las trampas</h2>
    <ul>
      <li>🎭 Hay videos y fotos <strong>falsas hechas con IA</strong>. No todo lo que ves en internet es real.</li>
      <li>📞 Hay estafas con <strong>voces falsas</strong>. Si alguien "conocido" te pide dinero por teléfono, cuelga y llámalo tú.</li>
      <li>💸 Claude <strong>nunca</strong> te va a pedir dinero ni datos del banco por chat.</li>
    </ul>
  </section>

  <section class="bloque">
    <h2>👑 Tú eres el jefe</h2>
    <ul>
      <li>🧠 La IA es una ayuda, no reemplaza <strong>tu cabeza ni tu gusto</strong>.</li>
      <li>🎨 En diseño, <strong>tus decisiones</strong> son lo que hace especial tu trabajo.</li>
      <li>😌 Descansa. Si te cansas, cierra la compu y sigue mañana. Claude te espera.</li>
      <li>🙋 Pedir ayuda a una persona también está muy bien.</li>
    </ul>
  </section>

  <section class="bloque">
    <h2>📅 Desafío de 30 días</h2>
    <p>Un mini-reto por día para no olvidar lo aprendido. ¡Elige los que quieras!</p>
    <ol>
      <li>Pregúntale a Claude por una palabra que no conozcas.</li>
      <li>Pídele una paleta de colores para tu estación del año favorita.</li>
      <li>Saca una foto a algo bonito y pregúntale qué colores tiene.</li>
      <li>Crea un juego con un artefacto.</li>
      <li>Pídele una clase corta de tipografía.</li>
      <li>Diseña tu logo personal.</li>
      <li>Usa el modo voz para hacerte un quiz.</li>
      <li>Escribe un mensaje bonito para alguien con ayuda de Claude.</li>
      <li>Crea una imagen con Microsoft Designer o Ideogram.</li>
      <li>Pídele a Claude que critique tu imagen.</li>
      <li>Haz un post de Instagram en Canva.</li>
      <li>Pídele a Claude que te invente un cliente imaginario.</li>
      <li>Haz el logo para ese cliente.</li>
      <li>Haz su paleta de colores.</li>
      <li>Crea su cartel.</li>
      <li>Pide a Claude que te explique la composición en diseño.</li>
      <li>Analiza con Claude un logo famoso: ¿por qué funciona?</li>
      <li>Crea una tarjeta animada de cumpleaños.</li>
      <li>Pídele a Claude ideas de nombres para una marca.</li>
      <li>Resume un documento largo con Claude.</li>
      <li>Busca en internet tendencias de diseño con Claude.</li>
      <li>Crea tu proyecto "Mi escuela de diseño".</li>
      <li>Pídele a Claude un ejercicio de diseño para hoy.</li>
      <li>Diseña un ícono simple en SVG.</li>
      <li>Explícale a alguien qué es la IA (¡enseñar ayuda a aprender!).</li>
      <li>Pídele a Claude que te haga un quiz de todo el curso.</li>
      <li>Rediseña algo que hiciste el día 6.</li>
      <li>Crea tu página web de portafolio.</li>
      <li>Agrega tus mejores trabajos al portafolio.</li>
      <li>¡Compártelo con tus amigos! 🎉</li>
    </ol>
    ${pr('Hazme un quiz de 10 preguntas fáciles sobre cómo usar la inteligencia artificial: qué es, cómo pedir bien las cosas, cómo subir fotos, artefactos y seguridad. Una pregunta a la vez, con opciones A, B y C. Espera mi respuesta antes de seguir.')}
  </section>

  <section class="bloque">
    <h2>📚 Para seguir aprendiendo</h2>
    <ul>
      <li>🔁 Repite las lecciones que más te gustaron. ¡Repetir es aprender!</li>
      <li>🎓 <strong>Anthropic Academy</strong> tiene cursos gratis (en inglés; el navegador los puede traducir).</li>
      <li>🧡 Cuando estés listo, prueba <strong>Claude Pro</strong> un mes para usar Claude Code y Claude Design.</li>
    </ul>
  </section>

  ${videos(
    yt('cómo detectar imágenes y videos falsos hechos con IA', 'Cómo detectar imágenes y videos falsos de IA'),
    yt('alucinaciones inteligencia artificial explicado', '¿Qué son las alucinaciones de la IA?'),
    yt('seguridad y privacidad al usar inteligencia artificial consejos', 'Usar la IA de forma segura'),
    web('https://www.anthropic.com/learn', 'Anthropic Academy (cursos gratis)')
  )}

  <section class="bloque zona-diploma">
    <h2>🎓 ¡Tu diploma!</h2>
    <p>${dos('Haz clic', 'Toca')} el cuadro, ${DICTA} y <strong>dicta tu nombre</strong>. ¡Es tu último ejercicio de voz!</p>
    <input class="buscador no-imprimir" id="nombre-diploma" type="text" placeholder="Tu nombre aquí 🎙️" aria-label="Tu nombre para el diploma">
    <div class="diploma" id="diploma">
      <div class="sello">🏆</div>
      <p><strong>DIPLOMA</strong></p>
      <p>Este diploma se entrega con orgullo a</p>
      <div class="nombre" id="diploma-nombre">&nbsp;</div>
      <p>por completar el curso<br><strong>"Aprende IA con Claude: de nivel 0 a nivel 100"</strong></p>
      <p>usando su voz, su paciencia y su creatividad. 🎙️🎨</p>
      <p class="fecha" id="diploma-fecha"></p>
    </div>
    <button class="boton no-imprimir" id="imprimir-diploma">🖨️ Imprimir o guardar diploma</button>
    <p class="solo-movil no-imprimir" style="margin-top:.8rem">📱 En el teléfono, elige <strong>"Guardar como PDF"</strong> para guardarlo, o <strong>"Compartir"</strong> para mandarlo por WhatsApp.</p>
  </section>
  `,
  mision: [
    'Sé qué datos nunca debo darle a una IA',
    'Le pregunté a Claude "¿estás seguro?"',
    'Hice el quiz final con Claude',
    'Elegí mi primer reto del desafío de 30 días',
    '¡Dicté mi nombre en el diploma!',
  ],
},
];

/* =========================================================
   DICCIONARIO
   ========================================================= */
window.CURSO.diccionario = [
  ['IA (Inteligencia Artificial)', 'Programas de computadora que entienden lo que dices y responden, crean o ayudan.'],
  ['Claude', 'Una IA creada por la empresa Anthropic. Es con la que aprendes en este curso.'],
  ['Anthropic', 'La empresa que creó a Claude.'],
  ['Chat', 'Una conversación escrita. Tú mandas mensajes y la IA responde.'],
  ['Prompt', 'Lo que tú le pides o le dices a la IA. Tu mensaje.'],
  ['Dictado por voz', 'Hablar para que la computadora o el teléfono escriban por ti. En Windows: tecla Windows + H.'],
  ['Modo voz', 'Conversar con Claude hablando, y Claude te responde con voz. Está en la app del teléfono.'],
  ['Artefacto', 'Algo que Claude construye en una ventana al lado del chat: una página, un juego, un dibujo, un documento.'],
  ['Código', 'Instrucciones escritas para la computadora. Claude lo escribe por ti.'],
  ['SVG', 'Un tipo de imagen hecha con formas. Se puede agrandar sin que se vea borrosa. Ideal para logos.'],
  ['Código de color (hex)', 'Un código como #FF6B35 que dice exactamente qué color es. Sirve para usar el mismo color en cualquier programa.'],
  ['Paleta de colores', 'Un grupo de colores que combinan bien y se usan juntos en un diseño.'],
  ['Tipografía', 'El tipo de letra y cómo se usa en un diseño.'],
  ['Google Fonts', 'Una página con cientos de tipos de letra gratis.'],
  ['Generador de imágenes', 'Una IA que crea imágenes a partir de una descripción. Ejemplos: Microsoft Designer, Ideogram.'],
  ['Captura de pantalla', 'Una foto de lo que se ve en tu pantalla. En Windows: Windows + Shift + S. En el teléfono: dos botones a la vez, o pedírselo al asistente de voz.'],
  ['Pantalla de inicio', 'La pantalla del teléfono donde están los íconos de tus apps.'],
  ['Proyecto', 'Una carpeta en Claude para un tema, con chats, archivos e instrucciones.'],
  ['Preferencias personales', 'Lo que le cuentas a Claude sobre ti una sola vez, para que lo tenga en cuenta siempre.'],
  ['Memoria', 'Cuando Claude recuerda cosas de conversaciones anteriores.'],
  ['Plan gratis', 'La forma de usar Claude sin pagar. Tiene un límite de mensajes.'],
  ['Plan Pro', 'Un plan de pago de Claude con más mensajes y más herramientas.'],
  ['Claude Code', 'Una versión de Claude que trabaja dentro de tu computadora creando programas y archivos.'],
  ['Claude Design', 'Una herramienta de Anthropic para crear diseños, prototipos y presentaciones conversando.'],
  ['Conector', 'Algo que conecta a Claude con otra app, como Google Drive o Canva.'],
  ['Alucinación', 'Cuando la IA dice algo falso como si fuera verdad.'],
  ['Navegador', 'El programa para entrar a internet. Por ejemplo: Chrome o Edge.'],
  ['App', 'Un programa. Puede ser del teléfono o de la computadora.'],
  ['Teclas especiales', 'Una opción de Windows para apretar combinaciones de teclas una por una. Se activa apretando Shift 5 veces.'],
  ['Acceso por voz', 'Una función de Windows 11 para controlar toda la computadora con la voz.'],
  ['API', 'Una forma para que los programadores conecten a Claude con sus propias aplicaciones.'],
];

/* =========================================================
   FRASES LISTAS (biblioteca de prompts)
   ========================================================= */
window.CURSO.frases = [
  { grupo: '👋 Para empezar', lista: [
    'Hola Claude. Uso el dictado por voz, así que si ves errores, adivina lo que quise decir. Explícame con palabras sencillas y un paso a la vez.',
    'No entendí. ¿Me lo explicas más fácil, con un ejemplo de la vida diaria?',
    'Hazlo más corto, máximo 5 frases.',
    'Dame solo el primer paso y espera a que yo te diga "listo".',
  ]},
  { grupo: '📚 Para aprender', lista: [
    'Explícame qué es [tema] como si yo tuviera 10 años.',
    'Hazme un quiz de 5 preguntas sobre lo que acabamos de hablar. Una pregunta a la vez.',
    'Quiero aprender [tema]. Hazme 3 preguntas para conocerme y después propónme un plan sencillo.',
    'Resúmeme este documento en 5 puntos fáciles.',
  ]},
  { grupo: '🎨 Para diseñar', lista: [
    'Dame 5 ideas de logo para [nombre del negocio], que es un negocio de [qué vende]. Explica cada idea en una frase.',
    'Crea una paleta de 5 colores para [tema]. Muéstrala como artefacto con cuadros grandes y sus códigos.',
    'Este es un diseño que hice. Dime 3 cosas que están bien y 3 que podría mejorar. Sé amable.',
    'Recomiéndame 3 combinaciones de letras gratis de Google Fonts para [tipo de diseño].',
    'Escríbeme 3 descripciones detalladas para crear con IA una imagen de [lo que quieres]. Incluye estilo, colores, luz y composición.',
    'Invéntame un cliente imaginario con un encargo de diseño y guíame paso a paso para resolverlo.',
  ]},
  { grupo: '🛠️ Para crear cosas', lista: [
    'Crea un juego sencillo de [tipo de juego] con botones grandes y colores alegres.',
    'Crea una tarjeta animada para [ocasión] con el mensaje "[mensaje]".',
    'Crea una página web de portafolio para un diseñador gráfico principiante. Hazme preguntas antes de empezar.',
    'Eso no funcionó. Vuelve a la versión anterior.',
  ]},
  { grupo: '🔒 Para estar seguro', lista: [
    '¿Estás seguro? ¿Hay algo de tu respuesta que debería confirmar con otra fuente?',
    'Busca en internet información actual sobre [tema] y muéstrame los links de donde la sacaste.',
  ]},
];

/* =========================================================
   GUÍA PARA EL ACOMPAÑANTE
   ========================================================= */
window.CURSO.guia = `
  <section class="bloque">
    <h2>🤝 Hola, acompañante</h2>
    <p>Esta página es para <strong>la persona que acompaña</strong> al estudiante. Aquí hay consejos para preparar la computadora y para enseñar con paciencia.</p>
  </section>

  <section class="bloque">
    <h2>🔧 Antes de la primera clase (checklist)</h2>
    <ul class="checklist" data-clave="guia-preparacion">
      <li><label><input type="checkbox"><span>Windows tiene el <strong>idioma español</strong> instalado (Configuración → Hora e idioma → Idioma y región). El dictado usa este idioma.</span></label></li>
      <li><label><input type="checkbox"><span>Probar <kbd>⊞ Windows</kbd> + <kbd>H</kbd> y activar <strong>"Puntuación automática"</strong> en la ruedita ⚙️.</span></label></li>
      <li><label><input type="checkbox"><span>Revisar que el <strong>micrófono</strong> funcione (Configuración → Sistema → Sonido). Si es posible, usar <strong>audífonos con micrófono</strong>.</span></label></li>
      <li><label><input type="checkbox"><span>Activar <strong>Teclas especiales</strong> (Shift 5 veces) si las combinaciones de teclas le cuestan.</span></label></li>
      <li><label><input type="checkbox"><span>Considerar un <strong>mouse para la mano izquierda</strong> o cambiar el botón principal del mouse (Configuración → Bluetooth y dispositivos → Mouse).</span></label></li>
      <li><label><input type="checkbox"><span>Opcional: probar <strong>Acceso por voz</strong> de Windows 11 para controlar todo con la voz.</span></label></li>
      <li><label><input type="checkbox"><span>Guardar este curso en <strong>favoritos</strong> del navegador y poner un acceso directo en el escritorio.</span></label></li>
      <li><label><input type="checkbox"><span>Tener una <strong>cuenta de Google</strong> (Gmail) para entrar a Claude sin contraseñas.</span></label></li>
      <li><label><input type="checkbox"><span>Imprimir la <strong>tarjeta de ayuda</strong> (abajo) y dejarla junto a la computadora.</span></label></li>
    </ul>
  </section>

  <section class="bloque">
    <h2>📱 Preparar el teléfono (checklist)</h2>
    <p>El curso <strong>detecta solo</strong> si se abre en un teléfono y cambia las instrucciones (micrófono del teclado en vez de Windows + H, capturas, menús de la app). Si se equivoca, en la portada del curso hay un botón para cambiar entre <strong>📱 Teléfono</strong> y <strong>💻 Computadora</strong>.</p>
    <ul class="checklist" data-clave="guia-movil">
      <li><label><input type="checkbox"><span>Abrir el curso en el teléfono y ponerlo en la <strong>pantalla de inicio</strong> (la portada del curso explica cómo). Así se abre como una app y funciona sin internet.</span></label></li>
      <li><label><input type="checkbox"><span>Instalar la <strong>app oficial de Claude</strong> (de Anthropic) y entrar con la misma cuenta de la computadora.</span></label></li>
      <li><label><input type="checkbox"><span>Revisar que el <strong>teclado esté en español</strong> y que el <strong>micrófono del teclado</strong> funcione.</span></label></li>
      <li><label><input type="checkbox"><span>Activar el <strong>modo una mano</strong> (Android) o <strong>Alcance</strong> (iPhone), y agrandar la letra del teléfono si hace falta.</span></label></li>
      <li><label><input type="checkbox"><span>iPhone: activar <strong>"Tocar atrás" → Captura de pantalla</strong> (Ajustes → Accesibilidad → Tocar). Android: probar <em>"Ok Google, haz una captura de pantalla"</em>.</span></label></li>
      <li><label><input type="checkbox"><span>Opcional: <strong>Voice Access</strong> (Android) o <strong>Control por voz</strong> (iPhone) para manejar todo con la voz.</span></label></li>
      <li><label><input type="checkbox"><span>Probar el <strong>modo voz</strong> de la app de Claude (el botón con ondas 〰️).</span></label></li>
    </ul>
    <div class="caja info"><p>💡 El progreso (las ⭐) se guarda <strong>en cada aparato por separado</strong>: lo que marque en el teléfono no aparece en la computadora.</p></div>
  </section>

  <section class="bloque">
    <h2>🧭 Cómo enseñar este curso</h2>
    <ul>
      <li>⏱️ <strong>Una lección por sesión</strong>, de 20 a 40 minutos. No más. Las lecciones 1, 6 y 7 pueden dividirse en dos días.</li>
      <li>🖐️ <strong>Deja que lo haga él.</strong> Aunque tarde más. No tomes el mouse. Si se traba, señala la pantalla y dile qué buscar.</li>
      <li>🔁 <strong>Repetir es bueno.</strong> Volver a una lección anterior no es retroceder.</li>
      <li>🎉 <strong>Celebra cada logro</strong>, aunque sea pequeño. El botón "¡Lo logré!" lanza confeti por eso.</li>
      <li>🔊 <strong>Usa el botón de escuchar.</strong> Leer y escuchar al mismo tiempo ayuda a entender y recordar.</li>
      <li>❓ <strong>Pregunta, no expliques todo.</strong> "¿Qué crees que hace este botón?" funciona mejor que una explicación larga.</li>
      <li>😮‍💨 <strong>Atento al cansancio.</strong> Si se frustra, paren y hagan algo divertido (un juego con artefactos, por ejemplo).</li>
      <li>🎨 <strong>Conecta con lo que le gusta.</strong> Usa el diseño gráfico como motivación: los ejemplos de diseño funcionan mejor que los genéricos.</li>
      <li>🧡 <strong>Claude también es un tutor.</strong> Cuando no estés, él puede preguntarle a Claude todo lo que no entienda.</li>
    </ul>
  </section>

  <section class="bloque">
    <h2>🗓️ Plan sugerido</h2>
    <div class="tabla-scroll"><table class="tabla">
      <tr><th>Semana</th><th>Lecciones</th><th>Meta</th></tr>
      <tr><td>1</td><td>0, 1</td><td>Entender qué es la IA y dictar con soltura.</td></tr>
      <tr><td>2</td><td>2, 3</td><td>Cuenta creada y conversaciones solo.</td></tr>
      <tr><td>3</td><td>4, 5</td><td>Pedir bien las cosas y usar fotos.</td></tr>
      <tr><td>4</td><td>6</td><td>Crear juegos y páginas con artefactos.</td></tr>
      <tr><td>5–6</td><td>7</td><td>Diseño gráfico con IA (con calma, es la más larga).</td></tr>
      <tr><td>7</td><td>8, 9</td><td>Organizarse y conocer el universo Claude.</td></tr>
      <tr><td>8</td><td>10</td><td>Seguridad, graduación y desafío de 30 días.</td></tr>
    </table></div>
    <p>Es solo una guía. <strong>El ritmo lo pone él.</strong></p>
  </section>

  <section class="bloque">
    <h2>🆘 Problemas comunes</h2>
    <ul>
      <li><strong>El dictado no escribe nada:</strong> revisar el micrófono, el idioma de Windows y la conexión a internet.</li>
      <li><strong>Claude dice que se acabaron los mensajes:</strong> es el límite del plan gratis. Esperar unas horas.</li>
      <li><strong>El botón "Abrir en Claude" abre vacío:</strong> usar "Copiar" y pegar con Ctrl + V.</li>
      <li><strong>El botón 🔊 no habla:</strong> probar en Microsoft Edge (tiene muy buenas voces en español) o revisar el volumen. En el teléfono: quitar el modo silencio y revisar que haya una voz en español instalada (Ajustes → "texto a voz" o "contenido hablado").</li>
      <li><strong>En el teléfono, "Abrir en Claude" abre la app sin la frase:</strong> es normal; la frase ya quedó copiada, solo hay que pegarla.</li>
      <li><strong>Algo de Claude se ve distinto al curso:</strong> Claude se actualiza seguido. Pregúntenle a Claude dónde está esa opción.</li>
    </ul>
  </section>

  <section class="bloque">
    <h2>🪪 Tarjeta de ayuda (para imprimir)</h2>
    <div class="tabla-scroll"><table class="tabla">
      <tr><th>Quiero...</th><th>Hago...</th></tr>
      <tr><td>🎙️ Escribir hablando</td><td><kbd>⊞ Windows</kbd> + <kbd>H</kbd></td></tr>
      <tr><td>📨 Enviar el mensaje</td><td><kbd>Enter ↵</kbd></td></tr>
      <tr><td>📋 Pegar</td><td><kbd>Ctrl</kbd> + <kbd>V</kbd></td></tr>
      <tr><td>✂️ Captura de pantalla</td><td><kbd>⊞ Windows</kbd> + <kbd>Shift ⇧</kbd> + <kbd>S</kbd></td></tr>
      <tr><td>⌨️ Teclas una por una</td><td><kbd>Shift ⇧</kbd> 5 veces → Sí</td></tr>
      <tr><td>🧡 Abrir Claude</td><td>claude.ai</td></tr>
      <tr><td>🤔 No entendí</td><td>Decirle a Claude: <em>"Explícamelo más fácil"</em></td></tr>
    </table></div>
    <h3>📱 En el teléfono</h3>
    <div class="tabla-scroll"><table class="tabla">
      <tr><th>Quiero...</th><th>Hago...</th></tr>
      <tr><td>🎙️ Escribir hablando</td><td>Tocar el micrófono 🎤 del teclado</td></tr>
      <tr><td>🗣️ Conversar hablando con Claude</td><td>En la app de Claude, tocar las ondas 〰️</td></tr>
      <tr><td>📨 Enviar el mensaje</td><td>Tocar la flecha ⬆️</td></tr>
      <tr><td>📋 Pegar</td><td>Dejar el dedo apretado en la caja → Pegar</td></tr>
      <tr><td>📸 Mostrar una foto</td><td>➕ → Cámara o Fotos</td></tr>
      <tr><td>🚀 Abrir Claude sin tocar</td><td><em>"Ok Google / Oye Siri, abre Claude"</em></td></tr>
    </table></div>
    <button class="boton secundario no-imprimir" onclick="window.print()">🖨️ Imprimir esta página</button>
  </section>
`;
