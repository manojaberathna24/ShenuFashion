// ============================================================
// SHENU FASHION STORE - Local Node.js Development Server
// Runs natively with zero npm dependencies!
// ============================================================

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.pdf':  'application/pdf',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(ROOT, reqPath);

  // Check if directory, serve index.html if present
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 response
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <body style="font-family:sans-serif;background:#0F0F1A;color:#F0EDE8;padding:40px;text-align:center;">
          <h1 style="color:#C9A96E;">404 - Page Not Found</h1>
          <p>Requested file was not found: <code>${reqPath}</code></p>
          <a href="/" style="color:#C9A96E;">Return to Shenu Fashion Store Home</a>
        </body>
      `);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  SHENU FASHION STORE - Server Running!`);
  console.log(`  URL: http://localhost:${PORT}`);
  console.log(`  Shop:    http://localhost:${PORT}/index.html`);
  console.log(`  Track:   http://localhost:${PORT}/pages/track-order.html`);
  console.log(`  Orders:  http://localhost:${PORT}/pages/orders.html`);
  console.log(`  Profile: http://localhost:${PORT}/pages/profile.html`);
  console.log(`=======================================================`);
});
