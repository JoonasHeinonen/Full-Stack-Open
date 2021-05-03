const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Provide a password as an argument.');
    process.exit(1);
}

const password = process.argv[2];

const url = 
    `mongodb+srv://joonas_heinonen:${password}@cluster0.3rrfg.mongodb.net/noteCollection?retryWrites=true&w=majority`;

mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
});
const Note = mongoose.model('Note', noteSchema);

const note = new Note({
    content: 'WordPress themes are easy to develop.',
    date: new Date(),
    important: false,
});

note.save().then(response => {
    console.log('Note saved!');
    mongoose.connection.close();
})

Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note);
    });
});