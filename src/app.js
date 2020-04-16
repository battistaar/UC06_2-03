const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const routes = require('./pages/router');
const errorHandlers = require('./errors');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.use(routes);

app.use(errorHandlers);

module.exports = app;