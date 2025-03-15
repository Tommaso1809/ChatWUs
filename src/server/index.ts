import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const serverPort = 49152;

app.get('/', (_req, res) => {
    res.send('Hello from Express + Socket.io!');
});

app.use(express.static(path.join(__dirname, '../client')));

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('A client connected.');

    socket.on('message', (msg) => {
        console.log(`Received message from ${msg.user}: ${msg.text}`);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
});

httpServer.listen(serverPort, () => {
    console.log(`Server started ---> ${serverPort}`);
});