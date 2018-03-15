'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// configuramos transport de nodemailer
const transport = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'user',
    pass: 'clave'
  }
});

// transport.sendMail({
//   to: 'jamg44@gmail.com',
//   from: 'NodeAPI <admin@nodeapi.com>',
//   subject: 'Compra confirmada',
//   text: 'Tu compra esta confirmada'
// }).then(() => {

// });

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

usuarioSchema.methods.sendMail = function() {
  console.log('Enviando mail...');

}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
