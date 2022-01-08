const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const connection = require('./../models/connection');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage });

router.get('/clear', async (req, res) => {
    await connection.clearData();
    charger();
    res.send('cleaned')
})

// // refatorar com socket
// router.get('/:name', (req, res) => {
//     res.sendFile(__dirname + "/../public/personagem.html");
// })

router.post('/new', async (req, res) => {
    let personagem = req.body
    let inserted = await connection.insertCharacter(personagem)
    charger()
    io.to(personagem.name).emit('update', personagem);
    res.send(inserted)
})

router.post('/data', async(req, res) => {
    let personagens = await connection.getcharacters();
    res.send(personagens)
})

router.post('/update', async (req, res) => {
    let personagem = req.body
    let changed = await connection.updateCharacter(personagem)
    charger()
    io.to(personagem.name).emit('update', personagem);
    res.send(changed)
})

router.post('/file-upload', upload.single('perfilPhoto'), function (req, res) {
    try {
        return res.status(200).send(req.file);
    } catch(e) {
        console.log(e);
        return res.status(404).send(e);
    }
});

module.exports = router;