const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get('/:name', (req, res) => {    
    res.sendFile(__dirname + "/personagem.html");
})

io.on('connection', (socket) => {
    
    socket.on('join', (room) => {
        console.log(room)
        socket.join(room)
    })

    socket.on('personagem privado', (room, personagem) => {
        console.log(room, personagem)
        socket.to(room).emit('definir personagem', personagem)
    });

    socket.on('altera vida', (room, vida) => {
        socket.to(room).emit('vida', vida)
    })
    
    socket.on('altera sanidade', (room, sanidade) => {
        socket.to(room).emit('sanidade', sanidade)
    })


    console.log('a user connected', socket.id);
});





server.listen(8081, function() {
  console.log("servidor rodando na url http://localhost:8081");
});
