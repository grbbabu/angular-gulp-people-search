'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

var port = process.env.PORT || 8081;

app.listen(port);

console.log('Running the application at http://localhost:'+ port);