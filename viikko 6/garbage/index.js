const express = require("express")
const morgan = require('morgan')
const app = express()
app.use(express.json())

// define custom morgan token 
morgan.token('jsonbody', function (req, res) {
    return JSON.stringify(req.body)
});

// use morgan middleware to log POST request
app.use(morgan(':method :url :status :res[content-length] bytes - :response-time ms :jsonbody', {
    skip: function (req, res) {
        return req.method !== 'POST';
    }
}));

// hardcoded initial phonebook
let phonebook = [
    { "id": 1, "name": "Jouni Dolonen", "number": "040-1234567" },
    { "id": 2, "name": "Jaana Dolonen", "number": "040-2345678" },
    { "id": 3, "name": "Jaakko Seppä", "number": "050-3456789" },
    { "id": 4, "name": "Jaani Jansson", "number": "050-4567890" }
]

// GET route - view phone table
app.get('/info', (req, res) => {
    // create datetime object
    const currentDate = new Date();

    // collect output information text
    let info = `<p>Where is ${phonebook.length} person(s) in phonebook</p>`;
    info += `<p>${currentDate.toString()}</p>`;

    // return info
    return res.send(info);

})
// POST route - adding persons
app.post('/api/henkilot', (req, res) => {
    // check request content is ok
    const { name, phone } = req.body || {};
    if (typeof name !== 'string' || !name || typeof phone !== 'string' || !phone)
        return res.status(400).json({ error: 'Name or/and phone cannot be empty.' });

    // check name already exists
    const filtered = phonebook.filter(person => person.name === name);
    if (filtered.length > 0)
        return res.status(400).json({ error: 'Given name already exists.' });

    // generate new ID
    const new_id = Math.max(...phonebook.map(person => person.id)) + 1;

    // create person record
    new_record = { id: new_id, name: name, number: phone }
    console.log(new_record);

    // store new record and return it
    phonebook.push(new_record);
    return res.status(200).json(new_record);
})

// DELETE route - remove persons
app.delete('/api/henkilot/:id', (req, res) => {
    // check request content is ok
    let id = req.params.id;
    if (id === undefined)
        return res.status(400).json({ error: 'ID not found.' });

    // find record with specified ID
    id = Number(id);
    const found_person = phonebook.find(person => person.id === id);


    // if no id found return error
    if (found_person === undefined)
        return res.status(404).json({ error: 'ID not found.' });

    // update phone table
    phonebook = phonebook.filter(person => person.id !== id);

    // return success
    return res.status(200).json({ message: 'Record deleted' });
})
app.get('/api/henkilot/:id', (req, res) => {
    // get parameter from request
    let id = req.params.id;
    if (id === undefined)
        res.status(200).json(phonebook);

    // searching for ID in persons
    id = Number(id);
    const found_person = phonebook.find(person => person.id === id);

    // return error if ID not exists 
    if (found_person === undefined)
        return res.status(400).json({ error: "Person not found" });

    // return valid answer
    res.status(200).json(found_person);
})


// start server listening
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Phonebook API running: http://localhost:${PORT}`));
