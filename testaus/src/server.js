const app = require('./app');

const PORT = process.env.PORT || 3000;

// Käynnistetään server vain, jos tiedostoa ajetaan suoraan
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🔄 Palvelin käynnistyi porttiin ${PORT}`);
    console.log(`🔗 http://localhost:${PORT}`);
  });
}

module.exports = app;