// Express on kevyt web-kehys, joka helpottaa reittien ja middlewarejen käyttöä.
const express = require('express');
const app = express(); // luodaan sovellusinstanssi

// GET / → vastataan pelkkä teksti. res.send osaa asettaa Content-Typen automaattisesti.
app.get('/', (req, res) => {
    res.send('Tervetuloa Expressiin!');
});

// Terveyschecki: palautetaan pieni JSON-objekti
app.get('/health', (req, res) => {
    res.json({ status: 'ok' }); // res.json serialisoi automaattisesti
});

// Portti ympäristömuuttujasta tai oletus 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express käynnissä osoitteessa on http://localhost:${PORT}`));
