const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Provide a password as an argument.');
    process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = 
    `mongodb+srv://joonas_heinonen:${password}@cluster0.3rrfg.mongodb.net/phoneDirectory?retryWrites=true&w=majority`;

mongoose.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
});
const Contact = mongoose.model('Contact', contactSchema);

const contact = new Contact({
    name: name,
    number: number
});

if (name === undefined || number === undefined) {
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact);
        });
        mongoose.connection.close();
    });
} else {
    contact.save().then(response => {
        console.log('Contact saved!');
        mongoose.connection.close();
    })
}
