const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const connection = require('./connection');

const { Server } = require("socket.io");
const io = new Server(server, { /* options */ });

let personagens = '';
async function charger() {
    personagens = await connection.getcharacters();
}

charger();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/clear', async (req, res) => {

    await connection.clearData();
    charger();
    res.send('cleaned')
})

app.get('/:name', (req, res) => {
    res.sendFile(__dirname + "/public/personagem.html");
})

app.post('/new', async (req, res) => {
    let personagem = req.body
    let inserted = await connection.insertCharacter(personagem)
    charger()
    io.to(personagem.name).emit('update', personagem);
    res.send(inserted)
})

app.post('/data', (req, res) => {
    res.send(personagens)
})

app.post('/update', async (req, res) => {
    let personagem = req.body
    let changed = await connection.updateCharacter(personagem)
    charger()
    console.log('update')
    io.to(personagem.name).emit('update', personagem);
    res.send(changed)
})

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


server.listen(process.env.PORT, function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
