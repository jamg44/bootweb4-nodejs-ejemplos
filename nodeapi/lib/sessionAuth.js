'use strict';

/** 
 * Modulo con función que devuelve un middleware 
 * El middleware verifica si la sesion no está autenticada para redirigir al login
 */
module.exports = function() {
  return function(req, res, next) {
    if (!req.session.authUser) {
      // redirigir al login si no está autenticado
      res.redirect('/login');
      return;
    }
    // si tengo usuario, por tanto dejo continuar
    next();
  }
}

