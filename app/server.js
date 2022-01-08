require('dotenv').config()
const express = require("express");
const app = express();
const router = require('./routes');
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const connection = require('./../models/connection');

const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))
app.use(router);



io.on("connection", (socket) => {
    console.log('a user connected');
    socket.on('room', async (room) => {
        socket.join(room)
    })

    socket.on('get characters', async() => {
        let personagens = await connection.getcharacters();
        socket.emit('characters data', personagens)
    })

    socket.on('getter', async (room) => {
        let personagens = await connection.getcharacters();
        for (let personagem of personagens){
            if (room == personagem.name){
                socket.emit('data', personagem)
            }
        }
    })

    socket.on(() => {
        socket.emit()
    })

});

server.listen(process.env.PORT, '0.0.0.0', function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
