// app.js
const express = require('express');
const app = express();

// 1) Ota JSON-body käyttöön KAIKKIIN reitteihin ennen niitä:
app.use(express.json());


// 2) Esimerkkireitti, joka odottaa JSONia muodossa { "text": "..." }
app.post('/message', (req, res) => {
    // Jos Content-Type ei ole JSON tai body puuttuu, req.body voi olla undefined
    if (!req.body || typeof req.body.text !== 'string' || !req.body.text.trim()) {
        return res.status(400).json({ error: 'teksti tarvitaan (JSON, esim. {"text":"Hei"})' });
    }
    res.status(201).json({ id: Date.now(), text: req.body.text.trim() });
});

app.listen(3000, () => console.log('http://localhost:3000 valmis'));

//Ajettava curl
//curl -s -X POST http://localhost:3000/message -H "Content-Type: application/json" -d "{\"text\":\"Hei\"}"