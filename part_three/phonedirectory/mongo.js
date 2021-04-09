const mongoose = require('mongoose');

const Person = require('./models/Person');

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

const person = new Person({
    name: name,
    number: number
});

if (name === undefined || number === undefined) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        });
        mongoose.connection.close();
    });
} else {
    person.save().then(response => {
        console.log('Person saved!');
        mongoose.connection.close();
    })
}
