require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');

const blogRouter = require('./controllers/blogs');

console.log('Connecting with the following url: ', config.MONGODB_URI);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(
    mongoUrl, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true 
    });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;