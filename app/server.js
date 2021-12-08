const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser')
const connection = require('./connection');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts')
const multer = require('multer');
const path = require('path');
const cors = require('cors');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'app/public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage });


const { Server } = require("socket.io");
const io = new Server(server);

let personagens = '';
async function charger() {
    personagens = await connection.getcharacters();
}

charger();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')     // Setamos que nossa engine será o ejs
app.use(expressLayouts)           // Definimos que vamos utilizar o express-ejs-layouts na nossa aplicação
app.use(express.static(__dirname + '/public'))


app.get("/", function(req, res) {
    res.render(__dirname + "/public/")
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

app.post('/file-upload', upload.single('perfilPhoto'), function (req, res) {
    try {
        return res.status(200).send(req.file);
    } catch(e) {
        console.log(e);
        return res.status(404).send(e);
    }
});

server.listen(process.env.PORT, '0.0.0.0', function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
