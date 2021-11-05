const express = require("express");
const fs = require("fs");

const app = express();

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

app.post('/:name', (req, res) => {
    let personagem = __dirname + "/personagem.html"
    console.log('//////////////', req.body)

    res.send([req.params.name, req.params.vida, req.params.sanidade])
})


app.get("/js", function (req, res) {
    res.sendFile(__dirname + "/script.js")
})

app.listen(8081,"0.0.0.0", function() {
  console.log("servidor rodando na url http://localhost:8081");
});
