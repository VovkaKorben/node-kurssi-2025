const express = require('express');
const app = express();

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express käynnissä osoitteessa on http://localhost:${PORT}`));
