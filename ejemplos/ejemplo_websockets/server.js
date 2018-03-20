'use strict';

const app = require('express')();
const server = require('http').Server(app);

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log('listening on port', port);
});