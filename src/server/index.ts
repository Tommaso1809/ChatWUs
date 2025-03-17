import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
import User from './db/userHandler';
import connectDB  from './db/dbConnection';

const app = express();
const serverPort = 49152;
const MESSAGES_FILE = path.join(__dirname, 'messages.json');
let messages: any[] = [];

// Function to load messages from file
function loadMessages() {
    try {
        if (fs.existsSync(MESSAGES_FILE)) {
            const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
            messages = JSON.parse(data);
            console.log(`Loaded ${messages.length} messages from history`);
        } else {
            console.log('No message history found, starting with empty history');
            messages = [];
        }
    } catch (error) {
        console.error('Error loading messages:', error);
        messages = [];
    }
}

// Function to save messages to file
function saveMessages() {
    try {
        fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2), 'utf8');
    } catch (error) {
        console.error('Error saving messages:', error);
    }
}

// Load messages when server starts
loadMessages();

app.get('/', (_req, res) => {
    res.send('Hello from Express + Socket.io!');
});

app.use(express.static(path.join(__dirname, '../client')));

const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log('A client connected.');
    
    // Send message history to newly connected client
    if (messages.length > 0) {
        socket.emit('message_history', messages);
    }

    

    socket.on('message', (msg) => {
        // Add timestamp to message
        msg.timestamp = new Date().toISOString();
        console.log(`Received message from ${msg.user}: ${msg.text}`);
        
        // Store message in history
        messages.push(msg);
        
        // Limit history to last 100 messages to prevent it from growing too large
        if (messages.length > 100) {
            messages = messages.slice(-100);
        }
        
        // Save to file
        saveMessages();
        
        // Broadcast to all clients
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
});

httpServer.listen(serverPort, () => {
    console.log(`Server started ---> ${serverPort}`);
});