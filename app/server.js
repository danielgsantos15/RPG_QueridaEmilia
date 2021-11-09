const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

app.get('/:name', (req, res) => {    
    res.sendFile(__dirname + "/public/personagem.html");
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


server.listen(process.env.PORT, function() {
    console.log("servidor rodando na url http://localhost:" + process.env.PORT);
});
