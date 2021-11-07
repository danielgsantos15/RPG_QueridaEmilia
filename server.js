const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get('/:name', (req, res) => {
    res.sendFile(__dirname + "/personagem.html");
})

io.on('connection', (socket) => {
    socket.on('cria spersonagem', (personagem) => {
        io.emit('definir personagem', personagem)
    });

    socket.on('altera vida', (vida) => {
        io.emit('vida', vida)
    })
    
    socket.on('altera sanidade', (sanidade) => {
        io.emit('sanidade', sanidade)
    })

    console.log('a user connected');
});



server.listen(8081, function() {
  console.log("servidor rodando na url http://localhost:8081");
});
