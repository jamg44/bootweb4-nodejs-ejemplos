'use strict';

const cote = require('cote');

// cliente de conversion de divisas

const requester = new cote.Requester({ name: 'currency conversion client' });

setInterval(() => {
  requester.send({
    type: 'convert', // quienquiera que escuche peticiones 'convert'
    amount: 100,
    from: 'usd',
    to: 'eur'
  }, res => {
    console.log(`client: 100 usd --> ${res} eur`, Date.now());
  });
}, 1000);
