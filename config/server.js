const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// Instancia Dependencias de Componentes para a Platafora
var cookieSession = require('cookie-session');
var express = require('express');
var consign = require('consign');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redirect = require("express-redirect");
var expressValidator = require('express-validator');
var io = require('socket.io')();

var redis = require('socket.io-redis');

io.set('origins', 'http://localhost:3000');
io.adapter(redis({ host: 'localhost', port: 6379 }));

global.passport = require("passport");

global.cors = require('cors')
global.multer = require('multer');

// Configurações de como o servidor vai se portar com a plataforma
var app = express();
redirect(app);

app.use(passport.initialize());
app.use(passport.session());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors( corsOptions ));
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/publics'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['secret_key_password'],
  cookie: { secure: false},
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

var store = new session.MemoryStore();
app.use(session({
  secret: 'secret_key_password',
  name: 'session',
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: { secure: false}

}));

app.io = io; // Jogar o IO dentro do Express

if (cluster.isMaster) {

  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {

  // Instancia o Server
  var server = app.listen( process.env.PORT, function(){
    console.log('Servidor ON | Porta: ' + process.env.PORT + ' | Clusterizado ( Processo ID: ' + process.pid + ' ) ' );
  });
  app.io.attach(server); // instancio junto com Express http

}

if( process.env.PRODUCTION == 1 ){

  const https = require('https');
  const fs = require('fs');

  var sslPath = '/etc/letsencrypt/live/chatnizer.com/';

  var options = {
      key: fs.readFileSync(sslPath + 'privkey.pem'),
      cert: fs.readFileSync(sslPath + 'fullchain.pem')
  };

  if (cluster.isMaster) {

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });

  } else {

    var httpsServer = https.createServer(options, app).listen(443);
    app.io.attach( httpsServer );

  }

}

consign()
  .include('app/routes')
  .then('config/DbConnect.js')
  .then('config/Passport.js')
  .then('app/models')
  .then('app/controllers')
  .then('app/utils')
  .into(app);


app.use(function(req, res, next){
  // 404
});

var socket = require('./../config/socket.js')(io, app);

module.exports = app;
