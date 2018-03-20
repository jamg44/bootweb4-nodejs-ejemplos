'use strict';

const app = require('express')();
const server = require('http').Server(app);

const io = require('socket.io')(server);

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

// socket.io communication
io.on('connection', socket => {
  console.log('nueva conexión de un cliente', socket.id);
  socket.on('chat message', msg => {
    console.log('mensaje recibido', msg);
    // emito a todos los clientes incluido el sender
    io.emit('chat message', msg);
  });
});


server.listen(port, () => {
  console.log('listening on port', port);
});