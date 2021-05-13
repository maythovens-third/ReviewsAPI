const express = require('express');
const db = require('./db');
var router = require('./routes.js');

var app = express();
app.use(express.json());
app.use('/', router);

module.exports = app;
