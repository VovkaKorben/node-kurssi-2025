const express = require('express');
const app = express();

// Middleware JSON-bodyn käsittelyyn
app.use(express.json());

// Health check -reitti
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Oletusreitti 404-virheelle
app.use((req, res) => {
    res.status(404).json({
        error: 'Reittiä ei löydy',
        message: `Polkua ${req.originalUrl} ei ole olemassa`
    });
});

// Vie sovellus testejä varten
module.exports = app;