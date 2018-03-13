'use strict';

const express = require('express');
const router = express.Router();

router.get('/:locale', (req, res, next) => {
  
  // recuperar lenguaje que me piden
  const locale = req.params.locale;
  
  // guardarme la página a la que volver
  const referer = req.get('referer');

  // establecer una cookie de idioma
  res.cookie('nodeapi-lang', locale, { maxAge: 900000 });
  
  // redirigir a la página donde estaba
  res.redirect(referer);
});

module.exports = router;
