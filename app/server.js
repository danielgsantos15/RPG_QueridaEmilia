const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const connection = require('./connection')
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
    res.send(changed)
    //rota para atualizar vida e sanidade
})


app.get('/get/:name',(req, res) => {
    console.log(req.params.name)
    for (let personagem of personagens){
        if (req.params.name == personagem.name){
            res.send(personagem)
        }
    }
})


server.listen(process.env.PORT, function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
