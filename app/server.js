const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);
const connection = require('./connection')
let personagens = '';
async function init() {
    personagens = await connection.getcharacters();
}

init();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/:name', (req, res) => {    
    res.sendFile(__dirname + "/public/personagem.html");
})

app.post('/new', (req, res) => {
    res.send('inserted')
})

app.post('/update/:type', (req, res) => {
    //rota para atualizar vida e sanidade
})


app.get('/get/:name', async (req, res) => {
    for (let personagem of personagens){
        if (req.params.name == personagem.name){
            res.send(personagem)
        }
    }
})


server.listen(process.env.PORT, function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
