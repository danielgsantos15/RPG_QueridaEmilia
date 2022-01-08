require('dotenv').config()
const express = require("express");
const app = express();
const router = require('./routes');
const http = require('http');
const server = http.createServer(app);
const connection = require('./../models/connection');
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors');

const { Server } = require("socket.io");
const io = new Server(server);

// app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(express.static('public'))
app.use(router);

charger();

let personagens = '';
async function charger() {
    personagens = await connection.getcharacters();
}

io.on("connection", (socket) => {
    socket.on('room', (room) => {
        socket.join(room)
    })

    socket.on('getter', (room) => {
        for (let personagem of personagens){
            if (room == personagem.name){
                socket.emit('data', personagem)
            }
        }
    })
});

server.listen(process.env.PORT, '0.0.0.0', function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
