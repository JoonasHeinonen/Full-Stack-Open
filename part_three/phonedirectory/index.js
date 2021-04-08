const express = require('express');
const morgan = require('morgan');

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

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

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
}

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

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person);
    } else {
        res.status(404).send('<p>404: Resource not found...');
    }
});

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).json({ 
          error: 'Name not defined.' 
        })
    }

    if (!body.number) {
        return res.status(400).json({ 
          error: 'Number not defined.' 
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    if (persons.some((p) => p.name === person.name)) {
        return res.status(400).json({ 
          error: 'Name is already existing in the records.' 
        });
    }

    persons = persons.concat(person);
    res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Application running at: 127.0.0.1:${PORT}`);
})