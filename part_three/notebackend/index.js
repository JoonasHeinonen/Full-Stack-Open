require('dotenv').config()

const express = require('express');
const cors = require('cors');

const Note = require('./models/note');
const { response } = require('express');

const app = express();

app.post('/api/notes', (req, res) => {
    const body = req.body;
    
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing',
        });
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    }

    note.save().then(savedNote => {
        response.json(savedNote)
    });
});

// Section for the handlers.

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' });
    }

    next(error);
}

app.use(express.json());
app.use(cors());
app.use(express.static('build'))
app.use(errorHandler);

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2020-01-10T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2020-01-10T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2020-01-10T19:20:14.298Z",
      important: true
    }
  ]

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map( n => n.id))
        : 0;

    return maxId + 1;
}

app.get('/', (req, res) => {
    res.send(
        '<h1>Hello World!</h1>'
    );
});

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
});

app.get('/api/notes/:id', (req, res, next) => {
    Note.findById(req.params.id)
        .then(note => {
            if (note) {
                res.json(note);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body;

    const note = {
        content: body.content,
        important: body.important
    };

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
});

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error));
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on: 127.0.0.1:${port}`);
});