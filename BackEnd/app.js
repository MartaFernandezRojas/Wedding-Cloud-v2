var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const port = 3000;

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var session = require('express-session');
app.use(session({
    secret:'cadena aleatoria',
    resave:true,
    saveUninitialized:true
}));

//configuracion de archivos
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/test2', function (req, res) {
    res.render('prueba');
});

console.log(__dirname);
//CORS MIDDLEWARE

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
   });

//creacion del servidor
app.listen(port, () => {
    console.log('Servidor corriendo correctamente');
});

module.exports = app;  