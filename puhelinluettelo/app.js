// index_lopullinen.js -> // index_lopullinen.js

// Express-palvelin, joka tallentaa ja hakee /api/henkilot -datan MongoDB Atlaksesta Mongoose-kirjastolla.

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dns = require('dns'); // Joissain verkoissa auttaa SRV/DNS-ongelmiin
dns.setDefaultResultOrder('ipv4first'); // Priorisoi IPv4-tulokset

require('dotenv').config(); // Lataa .env-tiedoston muuttujat

const Person = require('./models/person'); // Mongoose-malli

const app = express();

// --- Perusmiddlewaret ---
app.use(express.json());

// Morgan-logitus ja runko (body) POST/PUT-pyynnöille
morgan.token('post-data', (req) => {
    (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : ''
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));

// --- MongoDB Atlas -yhteys ---
const { MONGODB_URI, PORT } = process.env;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI puuttuu .env-tiedostosta');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('🌞 Yhteys MongoDB Atlakseen onnistui');
    })
    .catch((err) => {
        console.error('🤷 Virhe yhdistettäessä MongoDB:hen:', err);
        process.exit(1);
    });


// -- Reitit --

// Hae kaikki henkilöt
app.get('/api/henkilot', async (req, res, next) => {
    try {
        const persons = await Person.find({});
        res.json(persons);
    } catch (err) {
        next(err);
    }
});

// Info: lukumäärä + kellonaika
app.get('/info', async (req, res, next) => {
    try {
        const count = await Person.countDocuments({});
        const info = `
      <p>Puhelinluettelossa on ${count} henkilön tiedot</p>
      <p>${new Date()}</p>
    `;
        res.send(info);
    } catch (err) {
        next(err);
    }
});

// Hae yksittäinen henkilö MongoDB:llä
app.get('/api/henkilot/:id', async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) return res.status(404).json({ error: 'Henkilöä ei löydy' });
        res.json(person);
    } catch (err) {
        next(err);
    }
});

// Poista henkilö id:llä
app.delete('/api/henkilot/:id', async (req, res, next) => {
    try {
        const removed = await Person.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ error: 'Henkilöä ei löydy' });
        res.status(204).end(); // ✅ korjattu typosta: ei "end(t)"
    } catch (err) {
        next(err);
    }
});

// Lisää uusi henkilö
app.post('/api/henkilot', async (req, res, next) => {
    try {
        const { name, number } = req.body;

        if (!name || !number) {
            return res.status(400).json({ error: 'Nimi tai numero puuttuu' });
        }

        const person = new Person({ name, number });
        const saved = await person.save(); // Käynnistää skeeman validoinnit & unique-indeksin tarkastuksen
        res.status(201).json(saved);
    } catch (err) {
        next(err);
    }
});


// Päivitä henkilön tiedot (esim. numero)
app.put('/api/henkilot/:id', async (req, res, next) => {
    try {
        const { name, number } = req.body;

        if (!name || !number) {
            return res.status(400).json({ error: 'Nimi tai numero puuttuu' });
        }

        const updated = await Person.findByIdAndUpdate(
            req.params.id,
            { name, number },
            { new: true, runValidators: true, context: 'query' } // Validoinnit päivityksissä
        );

        if (!updated) {
            return res.status(404).json({ error: 'Henkilöä ei löydy' });
        }

        res.json(updated);
    } catch (err) {
        next(err);
    }
});

// --- Virheenkäsittely ---
app.use((error, req, res, next) => {
    console.error('Virhe:', error.name, error.message);

    if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Virheellinen ID' });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    if (error.name === 'MongoServerError' && error.code === 11000) {
        return res.status(400).json({ error: 'Nimi on jo luettelossa (uniikki)' });
    }

    res.status(500).json({ error: 'Palvelinvirhe' });
});


// --- Palvelimen käynnistys ---
const port = Number(PORT) || 3001;
app.listen(port, () => {
    console.log(`🛜  Palvelin käynnissä osoitteessa http://localhost:${port}`);
});