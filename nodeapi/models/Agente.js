'use strict';

const mongoose = require('mongoose');

// primero definimos un esquema
const agenteSchema = mongoose.Schema({
  name: { type: String, index: true },
  age: Number
});

// creamos el modelo
const Agente = mongoose.model('Agente', agenteSchema);

// exportamos el modelo
module.exports = Agente;
