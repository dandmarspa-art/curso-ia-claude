/* Guarda el curso en el teléfono para que funcione sin internet.
   Siempre intenta traer la versión nueva; si no hay internet, usa la guardada.
   Los audios se guardan a medida que se escuchan. */
const CACHE = 'curso-ia-v4';
const ARCHIVOS = ['./', 'index.html', 'estilos.css', 'app.js', 'lecciones.js', 'audios.js', 'manifest.webmanifest', 'icono-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const esAudio = url.pathname.includes('/audio/');
  // Un audio ya guardado no cambia (su nombre depende del texto): lo usamos directo
  if (esAudio) {
    e.respondWith(caches.match(url.pathname, { ignoreSearch: true }).then((r) => r || fetch(url.pathname).then((resp) => {
      if (resp.status === 200) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(url.pathname, copia)).catch(() => {}); }
      return resp;
    })));
    return;
  }
  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        if (resp.status === 200) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(e.request, copia)).catch(() => {}); }
        return resp;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match('index.html')))
  );
});
