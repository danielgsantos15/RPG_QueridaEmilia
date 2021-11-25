const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const connection = require('./connection');
// const multer = require("multer");

const { Server } = require("socket.io");
const io = new Server(server, { /* options */ });

io.on("connection", (socket) => {
    socket.on('room', (room) => {
        socket.join(room)
        console.log('na sala', room)
    })
});

let personagens = '';
async function charger() {
    personagens = await connection.getcharacters();
}

charger();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.set('view engine' , 'ejs');

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "uploads/")
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.originalname + Date.now());
//     }
// })

// const upload = multer({storage})


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

// app.post("/upload", upload.single("image") , (req, res) => {
//     res.send("imagem recebida!");
// })

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
    res.send(inserted)
})

app.post('/data', (req, res) => {
    res.send(personagens)
})

app.post('/update', async (req, res) => {
    let personagem = req.body
    let changed = await connection.updateCharacter(personagem)
    charger()
    console.log(personagem)
    io.to(personagem.name).emit('update', personagem);
    res.send(changed)
})

app.get('/get/:name',(req, res) => {
    for (let personagem of personagens){
        if (req.params.name == personagem.name){
            res.send(personagem)
        }
    }
})


server.listen(process.env.PORT, function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
