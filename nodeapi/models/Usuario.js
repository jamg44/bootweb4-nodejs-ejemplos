'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(plain) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plain, 10, function(err, hash) {
      if (err) {
        reject(err);
        return;
      }
      resolve(hash);
    });
  });
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
