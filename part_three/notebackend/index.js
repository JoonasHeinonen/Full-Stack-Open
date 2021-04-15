require('dotenv').config();

const express = require('express');
const cors = require('cors');

const Note = require('./models/note');

const app = express();

// Section for the handlers.

const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
};

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

app.get('/', (req, res) => {
    res.send(
        '<h1>Hello World!</h1>'
    );
});

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes);
    });
});


app.post('/api/notes', (req, res, next) => {
    const body = req.body;
    
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing',
        });
    }

    const note = new Note({
        content: body.content,
        important: body.important || false,
        date: new Date(),
    });

    note.save()
        .then(savedNote => 
            savedNote.toJSON()
        )
        .then(savedAndFormattedNote => {
            res.json(savedAndFormattedNote);
        })
        .catch(error => 
            next(error)
        );
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
            res.json(updatedNote);
        })
        .catch(error => next(error));
});

app.delete('/api/notes/:id', (req, res, next) => {
    Note.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on: 127.0.0.1:${port}`);
});