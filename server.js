const express = require('express');
const http = require('http');

const jwt = require('./jwt');

const app = express();
const server = new http.Server(app);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/', (req, res) => {
    res.send(jwt());
});

server.listen(3000, function () {
    console.log('listening on: ' + 3000);
});
