// Parametri- ja query-esimerkit samassa pienessä API:ssa.
const express = require('express');
const app = express();

// :name on reittiparametri. Se löytyy req.params-oliosta.
// Esim: GET /hello/Anna → req.params.name === 'Anna'
app.get('/hello/:name', (req, res) => {
    const { name } = req.params;
    res.send(`Hei, ${name}!`);
});

// Query-parametrit tulevat osoitteen ?a=3&b=5 osasta ja löytyvät req.query:stä.
// Validointi: jos a tai b ei ole numero, palautetaan 400 Bad Request.
app.get('/add', (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) {
        return res.status(400).json({ error: 'a ja b tulee olla numeroita' });
    }
    res.json({ result: a + b });
});

const PORT = process.env.PORT || 3001; // eri portti kuin hello-express
app.listen(PORT, () => console.log(`Greet API on http://localhost:${PORT}`));
