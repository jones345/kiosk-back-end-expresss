import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/events.js';
import userRoutes from './routes/user.js';
import usersRoutes from './routes/users.js';
import conversationRoutes from './routes/conversations.js';
import consultsRoutes  from './routes/consult.js'
import Apply from './routes/Apply.js';
import Server from 'socket.io';
import session from'cookie-session';
import helmet from 'helmet';

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet())

// cookies session
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
        secure: true,
        httpOnly: true,
        domain: 'example.com',
        path: 'foo/bar',
        expires: expiryDate
    }
}))


// routers
app.use('/api/events', eventRoutes);
app.use('/api/auth/user', userRoutes);
app.use('/api/profile/users', usersRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/apply', Apply);
app.use('/api/consult',consultsRoutes)


app.get('/', (req, res) => {
    res.send('connected');
});


// Server Port
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;


//TODO remove socket.io since is peer-to-peer connection

//connection to mongodb server

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const server = app.listen(PORT, () => console.log(`Server running on port and database connected: ${PORT}`));
        const io = new Server(server, { cookie: false });
        const users = {};

        const socketToRoom = {};

        io.on('connection', socket => {
            socket.on("join room", (roomID) => {
                if (users[roomID]) {
                    users[roomID].push(socket.id);
                } else {
                    users[roomID] = [socket.id];
                }
                socketToRoom[socket.id] = roomID;
                socket.join(roomID);
                const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

                socket.emit("all users", usersInThisRoom);
            });

            socket.on('playVideo', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('playVideo');
            });

            socket.on('pauseVideo', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('pauseVideo');
            });

            socket.on('stopVideo', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('stopVideo');
            });

            socket.on('chat message', (finalMessage) => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('chat message', finalMessage);
            });

            socket.on('mouse', (data) => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('mouse', data);
            });

            socket.on('erase', () => {
                socket.broadcast.to(socketToRoom[socket.id]).emit('erase');
            });

            socket.on('disconnect', () => {
                const roomID = socketToRoom[socket.id];
                let room = users[roomID];
                if (room) {
                    room = room.filter(user => user.id !== socket.id);
                    users[roomID] = room;
                }
                socket.broadcast.emit('user left', socket.id);
            });

        });
    })
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
