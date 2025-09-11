// seed.js

// Lisää esimerkkihonkilöt MongoDB:hen. Käytä --reset tyhjentääksi kokoelman ennen lisäystä.
// Esim: npm run seed:reset

require('dotenv').config();
const mongoose = require('mongoose');
const Person = require('./models/person');

const DATA = [
    { name: 'Jouni Dolonen', number: '040-1234567' },
    { name: 'Jaana Dolonen', number: '040-2345678' },
    { name: 'Jaakko Seppä', number: '050-3456789' },
    { name: 'Jaani Jansson', number: '050-4567890' },
    { name: 'Cpt. Jack Sparrow', number: '040-2596090' }
];

async function main() {
    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI puuttuu .env:stä');
        process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('🆗 Yhdistetty kantaan (seed)');

    const reset = process.argv.includes('--reset');
    if (reset) {
        await Person.deleteMany({});
        console.log('🧹 Tyhjennetty "people"-kokoelma');
    }

    try {
        await Person.insertMany(DATA, { ordered: true });
        console.log('📝 Esimerkkidata lisätty');
    } catch (err) {
        console.error('❌ Virhe siemenlisäyksessä:', err.message);
    } finally {
        await mongoose.connection.close();
        console.log('⬆️ Yhteys suljettu');
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});