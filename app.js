const deployd = require('deployd');
const express = require('express');
const http = require('http');
const io = require('socket.io')
const path = require('path');

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';
const CON = process.env.MONGODB_URI || 'mongodb://localhost:27017/bph-web';

const app = express();
const server = http.createServer(app);
io.listen(server);

deployd.attach(server, {
    socketIo: io,
    env: ENV,
    db: { connectionString: CON }
});

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(server.handleRequest);
server.listen(PORT);
