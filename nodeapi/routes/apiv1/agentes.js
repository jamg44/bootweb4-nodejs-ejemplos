'use strict';

const express = require('express');
const router = express.Router();

const Agente = require('../../models/Agente');

router.get('/', (req, res, next) => {
  Agente.find().exec((err, docs) => {
    if (err) {
      next(err);
      return;
    }
    // si no ha habido error
    res.json({ success: true, result: docs });
  });
});

module.exports = router;
