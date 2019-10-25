const express = require('express');
const http = require('http');

const jwt = require('./jwt');

const app = express();
const server = new http.Server(app);

app.get('/', (req, res) => {
    res.send(jwt());
});

server.listen(3000, function () {
    console.log('listening on: ' + 3000);
});
