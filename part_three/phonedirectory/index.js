require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/Person');
const { response } = require('express');

morgan.token('data', function (req, res) {
    return JSON.stringify(req.body);
});

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(morgan('tiny'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));
app.use(cors());

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else {
        return res.status(400).send({ error: error.message });
    }

    next(error);
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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    .catch(error => {
        next(error);
    });
})

app.post('/api/persons', (req, res, next) => {
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

    person
        .save()
        .then(savedPerson => {
            savedPerson.toJSON()
        })
        .then(savedAndFormattedPerson => {
            response.json(savedAndFormattedPerson)
        })
        .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
            console.log(req.params.id);
        })
        .catch(error => next(error));
});

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on: 127.0.0.1:${port}`);
});