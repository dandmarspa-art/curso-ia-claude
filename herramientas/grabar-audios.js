/* =========================================================
   Graba en MP3 todos los textos que el curso lee en voz alta.

   Usa Piper (voz por computadora, gratis y sin internet): https://github.com/rhasspy/piper
   Solo graba los textos nuevos o cambiados; borra los audios que ya no se usan.

   Uso (desde la carpeta del curso):
     set PIPER=C:\ruta\a\piper            (carpeta donde está piper.exe)
     set VOZ_MUJER=C:\ruta\es_AR-daniela-high.onnx
     set VOZ_HOMBRE=C:\ruta\es_ES-davefx-medium.onnx
     npm install lamejs@1.2.1   (una sola vez, en esta carpeta "herramientas")
     node herramientas/grabar-audios.js

   Cómo funciona: abre el curso en Microsoft Edge (sin ventana) en la dirección #/textos,
   que devuelve todos los textos en sus versiones de computadora, Android e iPhone.
   Cada audio se llama como la "huella" de su texto (igual que en app.js).
   ========================================================= */
const fs = require('fs');
const path = require('path');
const os = require('os');
const vm = require('vm');
const { execFileSync, spawnSync } = require('child_process');

const CURSO = path.resolve(__dirname, '..');
const EDGE = process.env.EDGE || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PIPER = process.env.PIPER;
const VOCES = { mujer: process.env.VOZ_MUJER, hombre: process.env.VOZ_HOMBRE };
const KBPS = 32;

if (!PIPER || !VOCES.mujer || !VOCES.hombre) {
  console.error('Faltan las variables PIPER, VOZ_MUJER y VOZ_HOMBRE. Mira las instrucciones al inicio de este archivo.');
  process.exit(1);
}

// --- 1. Sacar los textos del curso ---
function leerTextos() {
  const url = 'file:///' + path.join(CURSO, 'index.html').replace(/\\/g, '/').replace(/ /g, '%20') + '#/textos';
  const html = execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--virtual-time-budget=10000', '--dump-dom', url],
    { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'] });
  const m = html.match(/<pre id="textos-json">([\s\S]*?)<\/pre>/);
  if (!m) throw new Error('No se pudieron leer los textos del curso.');
  const json = m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  return JSON.parse(json);
}

// --- 2. Ajustar palabras para que la voz las diga bien (solo para grabar, no cambia la huella) ---
function paraLeer(t) {
  return t
    .replace(/\bIA\b/g, 'i a')
    .replace(/\bCtrl\b/g, 'control')
    .replace(/claude\.ai\/download/gi, 'claude punto ai, barra download')
    .replace(/claude\.ai/gi, 'claude punto ai')
    .replace(/\bSVG\b/g, 'ese ve ge')
    .replace(/\bPDF\b/g, 'pe de efe')
    .replace(/\bAPI\b/g, 'a pe i')
    .replace(/#[0-9A-F]{6}\b/gi, 'numeral, seguido del código')
    .replace(/\[([^\]]+)\]/g, '$1');
}

// --- 3. MP3 ---
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(require.resolve('lamejs/lame.all.js', { paths: [__dirname] }), 'utf8') + ';this.lamejs = lamejs;', ctx);
function wavAMp3(wav, mp3) {
  const b = fs.readFileSync(wav); const sr = b.readUInt32LE(24);
  let off = 12; while (b.toString('ascii', off, off + 4) !== 'data') off += 8 + b.readUInt32LE(off + 4);
  const n = b.readUInt32LE(off + 4) / 2;
  const pcm = new Int16Array(b.buffer.slice(b.byteOffset + off + 8, b.byteOffset + off + 8 + n * 2));
  const enc = new ctx.lamejs.Mp3Encoder(1, sr, KBPS); const partes = [];
  for (let i = 0; i < pcm.length; i += 1152) { const r = enc.encodeBuffer(pcm.subarray(i, i + 1152)); if (r.length) partes.push(Buffer.from(r)); }
  const f = enc.flush(); if (f.length) partes.push(Buffer.from(f));
  fs.writeFileSync(mp3, Buffer.concat(partes));
}

// --- 4. Grabar ---
const textos = leerTextos();
console.log(`${textos.length} textos en el curso.`);
const lista = {};
for (const [genero, modelo] of Object.entries(VOCES)) {
  const carpeta = path.join(CURSO, 'audio', genero);
  fs.mkdirSync(carpeta, { recursive: true });
  const faltan = textos.filter(t => !fs.existsSync(path.join(carpeta, t.huella + '.mp3')));
  console.log(`Voz ${genero}: ${faltan.length} audios por grabar.`);
  if (faltan.length) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'curso-voz-'));
    const entrada = faltan.map(t => JSON.stringify({ text: paraLeer(t.texto), output_file: path.join(tmp, t.huella + '.wav') })).join('\n') + '\n';
    const r = spawnSync(path.join(PIPER, 'piper.exe'),
      ['--model', modelo, '--json-input', '--length_scale', '1.05', '--sentence_silence', '0.3'],
      { input: entrada, stdio: ['pipe', 'ignore', 'inherit'], maxBuffer: 1 << 26 });
    if (r.status !== 0) throw new Error('Piper falló.');
    for (const t of faltan) {
      const wav = path.join(tmp, t.huella + '.wav');
      if (fs.existsSync(wav)) wavAMp3(wav, path.join(carpeta, t.huella + '.mp3'));
      else console.warn('  No se grabó:', t.texto.slice(0, 60));
    }
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  // Borrar audios de textos que ya no existen
  const vigentes = new Set(textos.map(t => t.huella + '.mp3'));
  for (const f of fs.readdirSync(carpeta)) if (!vigentes.has(f)) fs.unlinkSync(path.join(carpeta, f));
  lista[genero] = fs.readdirSync(carpeta).map(f => f.replace('.mp3', '')).sort();
}

// --- 5. Lista de audios que usa la página ---
fs.writeFileSync(path.join(CURSO, 'audios.js'),
  '/* Generado por herramientas/grabar-audios.js — no editar a mano. */\n' +
  'window.CURSO_AUDIOS = ' + JSON.stringify(lista) + ';\n');
let total = 0;
for (const g of Object.keys(VOCES)) for (const f of fs.readdirSync(path.join(CURSO, 'audio', g))) total += fs.statSync(path.join(CURSO, 'audio', g, f)).size;
console.log(`Listo. Audios: ${lista.mujer.length} de mujer, ${lista.hombre.length} de hombre (${(total / 1e6).toFixed(1)} MB).`);
