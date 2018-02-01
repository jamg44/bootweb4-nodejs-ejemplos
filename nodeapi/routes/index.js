var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/paramenruta/:id', (req, res, next) => {
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

router.get('/enquerystring', (req, res, next) => {
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
