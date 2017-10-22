'use strict';

var express = require('express');
var fs = require('fs');
var routes = require('./routes/routes');
var bodyParser = require('body-parser');


var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(res, req) {
    res.sendfile('index.html');
});


app.get('/patients', routes.findAllPatients);


app.listen(3000);
console.log('Listening on port 3000');