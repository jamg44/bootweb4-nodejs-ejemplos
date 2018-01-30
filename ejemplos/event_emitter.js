'use strict';

const EventEmitter = require('events');

// creamos un emisor de eventos
const emisor = new EventEmitter();

emisor.on('llamada de telefono', function(quienLlama) {
  if (quienLlama === 'madre') {
    return;
  }
  console.log('ring ring');
});

emisor.once('llamada de telefono', function() {
  console.log('brrr brrr');
});

emisor.emit('llamada de telefono', 'madre');
