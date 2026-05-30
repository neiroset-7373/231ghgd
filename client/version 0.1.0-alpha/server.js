const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/api/games', (req, res) => {
    res.json([
        {id: 'obby', name: 'WintoCraft Test Obby', desc: '3D платформер'},
        {id: 'kalmara', name: 'Красный цвет, зеленый цвет', desc: '3D игра в кальмара'},
    ]);
});

app.post('/api/select-device', (req, res) => {
    res.json({status: 'ok'});
});

app.get('/lobby/:device', (req, res) => {
    const device = req.params.device;
    const file = device === 'mobile' ? 'wintoblox-mobile-lobby-menu.html' : 'wintoblox-lobby.html';
    res.sendFile(path.join(__dirname, 'templates', file));
});

app.get('/game/:device/:gameId', (req, res) => {
    const {device, gameId} = req.params;
    let html = fs.readFileSync(path.join(__dirname, 'templates', 'games', `${gameId}.html`), 'utf8');
    html = html.replace(/{{ device }}/g, device);
    res.send(html);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'vibor-ystroistva.html'));
});

app.listen(PORT, () => {
    console.log(`Server started: http://127.0.0.1:${PORT}`);
});