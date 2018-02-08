'use strict';

const express = require('express');
const router = express.Router();

const Agente = require('../../models/Agente');

/**
 * @api {get} /agentes Request list of agents
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.get('/', async (req, res, next) => { // async convierte el resultado en una promesa
  /**
   * Con callback
   */
  /*Agente.find().exec((err, docs) => {
    if (err) {
      next(err);
      return;
    }
    // si no ha habido error
    res.json({ success: true, result: docs });
  });*/

  /**
   * Con promesa
   */
  /*Agente.find().exec().then(docs => {
    res.json({ success: true, result: docs });
  }).catch(err => {
    next(err);
    return;
  });*/

  // Con async/await
  try {

    // recogemos parámetros de entrada
    const name = req.query.name;
    const age = req.query.age;
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const fields = req.query.fields;

    console.log(req.query)

    const filtro = {};

    if (typeof name !== 'undefined') { // si me piden filtrar por nombre...
      filtro.name = name; // lo añado al filtro
    }

    if (typeof age !== 'undefined') {
      filtro.age = age;
    }

    const docs = await Agente.listar(filtro, skip, limit, sort, fields); // si usamos await, la función donde estoy
                                        // debe tener async
    
    res.json({ success: true, result: docs });  
  } catch(err) {
    next(err);
    return;
  }  
});

// POST /
// Añadir un agente
router.post('/', (req, res, next) => {
  console.log(req.body);

  const data = req.body;
  
  // creamos documento de agente en memoria
  const agente = new Agente(data);
  
  // lo persistimos en la base de datos
  agente.save((err, agenteGuardado) => { // .save es método de instancia
    if (err) {
      next(err);
      return;
    }
    res.json({ success: true, result: agenteGuardado });
  });
});

// DELETE /
// Elimina un agente
router.delete('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Agente.remove({_id: _id}).exec(); // .remove es método estático
    res.json({ success: true });
  } catch(err) {
    next(err);
    return;
  }
});

// PUT /
// Actualiza un agente
router.put('/:id', async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;

    const agenteActualizado = await Agente.findByIdAndUpdate(_id, data, { 
      new: true // esto es para obtener la nueva versión del documento
                // tras actualizarlo
    });
    
    res.json({ success: true, result: agenteActualizado });

  } catch(err) {
    next(err);
    return;
  }
});

module.exports = router;
