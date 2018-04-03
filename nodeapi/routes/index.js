var express = require('express');
var router = express.Router();
const i18n = require('../lib/i18nConfigure')();
const sessionAuth = require('../lib/sessionAuth');
const Usuario = require('../models/Usuario');

// cargamos librería de validaciones
const { query, validationResult } = require('express-validator/check');

// cargamos objeto de upload
const upload = require('../lib/uploadConfig');

/* GET home page. */
router.get('/', sessionAuth(), function(req, res, next) {
  //res.render('index', { title: 'Nodeapi' });

  const segundo = (new Date()).getSeconds();

  res.locals.valor = 123;
  res.locals.texto = `<script>alert("${res.__('hola, he conseguido inyectar codigo')}")</script>`;
  res.locals.condicion = {
    segundo: segundo,
    estado: segundo % 2 === 0
  };
  res.locals.users = [
    { name: 'Smith', age: 20 },
    { name: 'Thomas', age: 34 },
    { name: 'Jones', age: 47 }
  ];
  res.render('index');
});

router.post('/sendemail', async (req, res, next) => {
  try {
    
    await req.user.sendMail('Nodeapi', 'Asunto de prueba', 'Correo de prueba');
    
    res.redirect('/');
  } catch(err) {
    next(err);
    return;
  }
});

router.post('/upload', upload.single('imagen'), (req, res, next) => {
  console.log('upload:', req.file);
  res.redirect('/');
});

router.get('/paramenruta/:id', sessionAuth(), (req, res, next) => {
  console.log('req.params', req.params);
  const id = req.params.id;
  res.send('ok');
});

router.get('/paramopcional/:dato?', (req, res, next) => {
  console.log('req.params', req.params);
  res.send('ok');
});

// acepts numeric ids 
router.get('/param/:id([0-9]+)/piso/:piso/puerta/:puerta(A|B|C)', (req, res, next) => {
  console.log('req.params', req.params);
  res.send('ok');
});

router.get('/enquerystring', [
  query('age')
    .isNumeric().withMessage('debería ser un número')
    .custom((value) => {
      if (value < 18) {
        throw new Error('debe ser mayor de edad');
      }
      return true;
    })
  
], (req, res, next) => {
  validationResult(req).throw();
  console.log('req.query', req.query);
  const pelo = req.query.pelo;
  const sexo = req.query.sexo;
  res.send('ok');
});

router.post('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
});

module.exports = router;
