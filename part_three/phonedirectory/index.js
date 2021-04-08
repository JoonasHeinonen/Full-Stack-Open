const express = require('express');

const PORT = 8000;
const app = express();

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
    {
        name: "Murray Philips",
        number: "39-22-542577",
        id: 5
    },
    {
        name: "Anton Girdeux",
        number: "33-205566",
        id: 6
    }
];
let date = new Date();

app.get('/', (req, res) => {
    res.send('<h1>Phonedirectory</h1>');
})

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook currently has ${persons.length} records.</p>` + 
             `<p>Date of the query: ${date}`
    );
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.listen(PORT, () => {
    console.log(`Application running at: 127.0.0.1:${PORT}`);
})