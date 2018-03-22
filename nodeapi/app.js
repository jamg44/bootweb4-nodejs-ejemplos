var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const jwtAuth = require('./lib/jwtAuth');

// conectamos la base de datos
const conn = require('./lib/connectMongoose');
// cargamos los modelos para que mongoose los conozca
require('./models/Agente');
const Usuario = require('./models/Usuario');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); // decimos a express que use extension html
app.engine('html', require('ejs').__express); // le decimos como manejar vistas html

app.locals.title = 'Nodeapi';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// middleware de estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuramos multiidioma en express
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

console.log(i18n.__('TEXT'));
console.log(i18n.__('HELLO', 'Juan', 'España'));
console.log(i18n.__('NAME_AND_AGE', {name: 'Javier', age: 33}));
console.log(i18n.__({ phrase: 'TEXT', locale: 'es'})); // forzar un idioma
console.log(i18n.__n('MOUSE', 1));
console.log(i18n.__n('MOUSE', 2));

const loginController = require('./routes/loginController');

/**
 * Middlewares de mi api
 */
app.use('/apiv1/agentes', jwtAuth(), require('./routes/apiv1/agentes'));
app.use('/loginJWT', loginController.postLoginJWT);

// middleware de control de sesiones
app.use(session({
  name: 'nodeapi-session',
  secret: 'askjdahjdhakdhaskdas7dasd87asd89as7d89asd7a9s8dhjash',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true }, // dos dias de inactividad
  store: new MongoStore({
    // como conectarse a mi base de datos
    url: 'mongodb://localhost/cursonode' // fix issue https://github.com/jdesboeufs/connect-mongo/issues/277
    // mongooseConnection: conn
  })
}));

app.use(async (req, res, next) => {
  try {
    // si el usuario está logado, cargamos en req.user el objeto de usuario desde la base de datos
    // para que los siguientes middlewares lo puedan usar
    req.user = req.session.authUser ? await Usuario.findById(req.session.authUser._id) : null;
    next();
  } catch(err) {
    next(err);
    return;
  }
});

/**
 * Middlewares de mi aplicación web
 */
app.use(function(req, res, next) {

  //console.log('peticion', req.path);

  // o respondemos o llamamos a next (obligatoriamente)
  //res.send('hola caracola');
  next();

  // podemos forzar el saltar los siguientes e ir al middleware de error directamente
  //next(new Error('se te ha olvidao poner el cif'));
});

app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/logout', loginController.logout);

app.use('/',      require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/lang',  require('./routes/lang'));

app.use('/users', require('./routes/users'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // si es una petición de API, respondemos con JSON
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return;
  }

  // Respondo con una página de error

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
