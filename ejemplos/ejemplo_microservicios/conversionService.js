'use strict';

// Servicio de cambio de moneda

const cote = require('cote');

const responder = new cote.Responder({ name: 'currency conversion responder'});

// tabla de conversión
// simboliza mi almacén de datos propio
const rates = {
  usd_eur: 0.89,
  eur_usd: 1.11
};

// req: { amount: 100, from: 'eur', to: 'usd' }
responder.on('convert', (req, done) => {
  console.log('servicio: petición de', req.from, req.to, req.amount, Date.now());
  const result = rates[`${req.from}_${req.to}`] * req.amount;
  done(result);
});
