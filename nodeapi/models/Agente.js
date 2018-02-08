'use strict';

const mongoose = require('mongoose');

// primero definimos un esquema
const agenteSchema = mongoose.Schema({
  name: { type: String, index: true },
  age: Number
});

// creamos un método estático (del modelo)
agenteSchema.statics.listar = function(filtro, skip, limit, sort, fields, callback) {
  // obtenemos la query sin ejecutarla
  const query = Agente.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec(callback);
};

// creamos el modelo
const Agente = mongoose.model('Agente', agenteSchema);

// exportamos el modelo
module.exports = Agente;
