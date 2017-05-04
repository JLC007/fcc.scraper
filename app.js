var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var index = require('./routes/index');

var app = express();

var main = function() {
    var http = require('http');
    var server = http.createServer(app);

    app.use('/', index);
    
    app.use(function (req, res, next) {
        res.status(404).send('Sorry cant find that!')
    })

    app.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })

    server.listen(3500);
}

main();
module.exports = app;




