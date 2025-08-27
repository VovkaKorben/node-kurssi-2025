// kotitehtävä4.js

// valmista tyhjä taulukko
let data = [];

// APP objektin luominen
const express = require('express');
const app = express();


// aseta JSON väliohjelmistoksi
app.use(express.json());


// käsittely POST
app.post('/notes', (req, res) => {
    const bodytext = req.body.text.trim();
    // Jos Content-Type ei ole JSON tai body puuttuu, req.body voi olla undefined
    if (!req.body || typeof req.body.text !== 'string' || !bodytext) {
        return res.status(400).json({ error: 'teksti tarvitaan (JSON, esim. {"text":"Hei"})' });
    }
    const id = Date.now();
    data.push({ id: id, text: bodytext });
    res.status(201).json({ id: id, text: bodytext });
});

// käsittely GET
app.get('/notes', (req, res) => {
    res.status(200).json(data);
});

app.listen(3001, () => console.log('Muistiinpanot API: http://localhost:3001'));


/*
lisää muistiinpano: 
curl -s -X POST http://localhost:3001/notes -H "Content-Type: application/json" -d "{\"text\":\"Hei\"}"

nouda muistiinpanot:
curl -s -X GET http://localhost:3001/notes 
*/
