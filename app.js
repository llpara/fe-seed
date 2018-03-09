const express = require('express')
const winston = require('winston');
var bodyParser = require('body-parser');
const util = require('util');

//text comes from here
var content = require('./content');

var logger = new winston.Logger({
    level: 'info',
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({
            filename: 'app.js.log'
        })
    ]
});

const app = express();

// Constants
const PORT = 5000;
const HOST = '::';

var textBodyParser = bodyParser.text({
    type: '*/*'
});

app.listen(PORT, HOST, function () {
    logger.info(util.format('Server listening port %d!', PORT));

})

app.get('/', function (req, res) {
    res.redirect('index.html');
})

app.get('/api/text', function (req, res) {
    logger.info(content);
    res.json({
        text: content
    });
})


var globalState;
app.post("/api/save", textBodyParser, (req, res) => {
    logger.info(util.format("GlobalState <-- %s", req.body));
    globalState = req.body;
    logger.info(util.format("GlobalState = %s", globalState));
    res.sendStatus(200);
})

app.get('/api/load', function (req, res) {
    logger.info(util.format("GlobalState --> %s", globalState));
    res.send(globalState);
})
