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

app.get("/css", function (req, res) {
    fs.readFile(__dirname + "/estilo.css", (err, data) => {
        if (err) console.log(err);
        res.setHeader('content-type', 'text/css');
        res.writeHead(200)
        res.end(data)
    })
})
let userId = '';

app.get('/:name', (req, res) => {
    userId = req.params.name;

    
    res.sendFile(__dirname + "/personagem.html");
})


app.get("/js", function (req, res) {
    res.sendFile(__dirname + "/script.js")
})

io.on('connection', (socket) => {
    
    socket.broadcast.to(userId).emit('oi', 'hiiiis')



    socket.on('personagem', (personagem) => {
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
