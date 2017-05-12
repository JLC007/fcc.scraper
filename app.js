var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var index = require('./routes/index');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))

var main = function() {
    var http = require('http');
    var server = http.createServer(app);

    app.use('/', index);
    app.use('/img',express.static(path.join(__dirname, 'public/img')));
    app.use('/js',express.static(path.join(__dirname, 'public/js')));
    app.use('/css',express.static(path.join(__dirname, 'public/css')));
    app.use('/sources',express.static(path.join(__dirname, 'sources')));

    app.use('/results',function(req, res, next){
        res.sendFile(path.join(__dirname + '/results.html'));
    });

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




