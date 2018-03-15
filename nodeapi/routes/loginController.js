'use strict';

const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

class LoginController {
  
  // GET /
  index(req, res, next) {
    res.locals.email = process.env.NODE_ENV === 'development' ? 'admin@example.com' : '';
    res.locals.error = '';
    res.render('login');
  }

  // POST /
  async post(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    
    res.locals.error = '';
    res.locals.email = email;

    const user = await Usuario.findOne({ email: email });

    // Comprobar usuario encontrado y verificar la clave del usuario
    if (!user || !await bcrypt.compare(password, user.password)) {
      res.locals.error = 'Credenciales incorrectas';
      res.render('login');
      return;
    }

    // abcd1234 - admin
    // dentro de la sesión apunto el _id del usuario, para saber que esta
    // sesión está autenticada
    req.session.authUser = { _id: user._id };

    // usuario encontrado y validado
    res.redirect('/');
  }

  // GET /logout
  logout(req, res, next) {
    delete req.session.authUser; // borrar authUser de la sesion
    req.session.regenerate(function(err) { // crear nueva sesión vacia
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    })
  }
}

module.exports = new LoginController();
