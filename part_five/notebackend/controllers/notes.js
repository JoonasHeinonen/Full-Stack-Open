const jwt = require('jsonwebtoken');
const noteRouter = require('express').Router();
const Note = require('../models/note');
const User = require('../models/user');
const config = require('../utils/config');

noteRouter.get('/', async(req, res) => {
    const notes = await Note
        .find({}).populate('user', { username: 1, name: 1 });

    res.json(notes.map(note => note.toJSON()));
});

const getTokenFrom = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        console.log('authorization');
        return authorization.substring(7);
    }
    return null;
};

noteRouter.post('/', async(req, res) => {
    const body = req.body;
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.SECRET);

    if (!token || !decodedToken.id) {
        return res.status(401).json({ err: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    const note = new Note({
        content: body.content,
        important: body.important === undefined ? false : body.important,
        date: new Date(),
        user: user._id
    });

    const savedNote = await note.save();
    user.note = user.notes.concat(savedNote._id);
    await user.save();
    res.json(savedNote.toJSON());
});

noteRouter.put('/:id', async(req, res, next) => {
    const body = req.body;
    const note = { likes: body.likes };

    await Note.findByIdAndUpdate(req.params.id, note, { new: true })
        .then(updatedNote => {
            res.json(updatedNote);
        })
        .catch(error => next(error));
});


noteRouter.delete('/:id', async(req, res, next) => {
    const decodedToken = jwt.verify(req.token, config.SECRET);

    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ err: 'token missing or invalid' });
    }

    const note = await Note.findByIdAndRemove(req.params.id)
        .catch(error => next(error));
    const userId = req.decodedToken.id;

    if (note.user.toString() === userId.toString()) {
        res.status(401).end();
    } else {
        res.status(204).end();
    }
});

module.exports = noteRouter;