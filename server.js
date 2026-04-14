const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3000;
const STATE_FILE = path.join(__dirname, 'state.json');

function loadStateFromDisk() {
  try {
    if (!fs.existsSync(STATE_FILE)) return null;
    const raw = fs.readFileSync(STATE_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch (error) {
    console.error('Failed to load saved state:', error.message);
    return null;
  }
}

function saveStateToDisk(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (error) {
    console.error('Failed to persist state:', error.message);
  }
}

let latestState = loadStateFromDisk();

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.redirect('/pencatat');
});

app.get('/scoreboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'score', 'index.html'));
});

app.get('/tv', (req, res) => {
  res.sendFile(path.join(__dirname, 'score', 'index.html'));
});

app.get('/score', (req, res) => {
  res.redirect('/tv');
});

app.get('/pencatat', (req, res) => {
  res.sendFile(path.join(__dirname, 'score', 'pencatat.html'));
});

app.get('/moderator', (req, res) => {
  res.sendFile(path.join(__dirname, 'kuiz-stem-tahun2.html'));
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true });
});

app.get('/api/state', (req, res) => {
  res.status(200).json({ state: latestState });
});

io.on('connection', (socket) => {
  socket.emit('state:init', latestState);

  socket.on('state:register', (info) => {
    socket.data.role = info?.role || 'unknown';
    socket.data.clientId = info?.clientId || socket.id;
  });

  socket.on('state:update', (payload) => {
    if (!payload || typeof payload !== 'object') return;
    latestState = {
      ...payload,
      updatedAt: Date.now()
    };
    saveStateToDisk(latestState);
    io.emit('state:update', latestState);
  });
});

server.listen(PORT, () => {
  console.log(`Quiz realtime server running at http://localhost:${PORT}`);
  console.log(`Pencatat: http://localhost:${PORT}/pencatat`);
  console.log(`TV: http://localhost:${PORT}/tv`);
  console.log(`Legacy Moderator: http://localhost:${PORT}/moderator`);
  console.log(`Legacy Scoreboard: http://localhost:${PORT}/scoreboard`);
});
