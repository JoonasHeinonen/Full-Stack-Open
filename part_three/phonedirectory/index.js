require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/Person');

morgan.token('data', function (req, res) {
    return JSON.stringify(req.body);
});

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(cors());

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
    },
    {
        name: "Angela Cross",
        number: "43-1413631",
        id: 7
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
    Person.find({}).then(persons => {
        res.json(persons)
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    });
})

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

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        response.json(savedPerson)
    });
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
            console.log(req.params.id);
        })
        .catch(error => next(error));
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on: 127.0.0.1:${port}`);
});