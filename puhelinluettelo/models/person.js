// models/person.js

// Määrittelee "Person"-mallin skeeman, validoinnit ja JSON-muunnoksen.

const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nimi on pakollinen'],
            unique: true,
            minlength: [3, 'Nimen pituus vähintään 3 merkkiä']
        },
        number: {
            type: String,
            required: [true, 'Numero on pakollinen'],
            minlength: [5, 'Numeron pituus vähintään 5 merkkiä']
        },
    },
    { timestamps: true }
);

// Muotoile JSON vastaukset siisteiksi (id merkkijonona, ei _id eikä __v)
personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});


/*
HUOM: unique: true luo uniikki-indeksin kantaan. Ensimmäisellä ajolla Mongoose
luo indeksin taustalla. Tarvittaessa voit varmistaa indeksin MongoDB:ssä:
db.people.createIndex({ name: 1 }, { unique: true })
*/

module.exports = mongoose.model('Person', personSchema);