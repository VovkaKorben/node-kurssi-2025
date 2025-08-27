const express = require("express")
const app = express()
app.use(express.json())

let todos = [
    { id: 1, task: "Osta leipää", done: false },
    { id: 2, task: "Vie roskat", done: true }
]


app.get('/todos', (req, res) => {
})

app.post('/todos', (req, res) => { })
const PORT = 3001
app.listen(PORT, () => (
    console.log(`Listening at port ${PORT}`)
))
/*
    const id = Number(req.params.id);
    console.log(`/api/notes/${id}`);
    const note = notes.find(note => note.id === id);
    if (note === undefined) {
        console.log(`note ID #${id} not found!`);
        res.status(404).send('Note not found');
    }
    else {
        console.log(`note: ${note}`);
        res.json(note);
    }
})
app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const l = notes.length;
    notes = notes.filter(note => note.id !== id)
    console.log(`Deleted ${l - notes.length} note(s)`);
    res.status(204).end();
})

*/
