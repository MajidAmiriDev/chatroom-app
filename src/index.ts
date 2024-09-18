

import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path'; // اضافه کردن path برای مسیر دهی به فایل‌های استاتیک
import chatRoutes from './routes/chatRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// سرو کردن فایل‌های استاتیک
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('message', (message: any) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

mongoose.connect('mongodb://localhost/chatapp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});