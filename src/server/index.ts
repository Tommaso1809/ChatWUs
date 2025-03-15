import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';

const app = express();
const serverPort = 49152;

// Create a simple route (optional)
app.get('/', (_req, res) => {
    res.send('Hello from Express + Socket.io!');
});

app.use(express.static(path.join(__dirname, '../client')));

// Create an HTTP server from Express
const httpServer = http.createServer(app);

// Set up Socket.io
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('A client connected.');

    socket.on('message', (msg) => {
        console.log(`Received message from ${msg.user}: ${msg.text}`);
        io.emit('message', msg); // Everyone, including sender, gets the message
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
});

// Start the server
httpServer.listen(serverPort, () => {
    console.log(`Server started ---> ${serverPort}`);
});