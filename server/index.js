const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoint - list games
  if (req.url === '/api/games') {
    const games = [
      { id: 'obby', name: 'WintoCraft Test Obby', type: 'platformer' },
      { id: 'kalmara', name: 'Красный цвет, зеленый цвет', type: 'action' },
      { id: 'third', name: 'Игра 3', type: 'coming_soon' },
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(games));
    return;
  }

  // API endpoint - player stats
  if (req.url === '/api/stats') {
    const stats = {
      online: 1,
      totalPlayers: 1,
      serverStatus: 'online',
      version: '0.1.0-alpha',
    };
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(stats));
    return;
  }

  // Static files
  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, '..', 'client', 'version 0.1.0-alpha', filePath);

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`  WintoBlox Server Started!`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`=================================`);
  console.log(`  API Endpoints:`);
  console.log(`  - GET /api/games   (list games)`);
  console.log(`  - GET /api/stats   (server stats)`);
  console.log(`=================================`);
});
