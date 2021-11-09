const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.get('/:name', (req, res) => {    
    res.sendFile(__dirname + "/personagem.html");
})

let personagens = []

app.post('/new', (req, res) => {
    personagens.push(req.body)
    res.send('inserted')
})


app.get('/get/:name', (req, res) => {
    for (let personagem of personagens){
        if (req.params.name == personagem.name){
            res.send(personagem)
        }
    }
})


server.listen(8081, function() {
  console.log("servidor rodando na url http://localhost:8081");
});
