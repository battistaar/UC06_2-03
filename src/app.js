const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const app = express();
const routes = require('./pages/router');
const errorHandlers = require('./errors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/its_books', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(morgan('tiny'));
app.use(routes);

app.use(errorHandlers);

module.exports = app;