import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const serverPort = 3000;

// Create a simple route (optional)
app.get('/', (_req, res) => {
    res.send('Hello from Express + Socket.io!');
});

// Create an HTTP server from Express
const httpServer = http.createServer(app);

// Set up Socket.io
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('A client connected.');

    socket.on('message', (msg) => {
        console.log(`Received message: ${msg}`);
        // Broadcast the message to other connected clients
        socket.broadcast.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
});

// Start the server
httpServer.listen(serverPort, () => {
    console.log(`Server started ---> ${serverPort}`);
});