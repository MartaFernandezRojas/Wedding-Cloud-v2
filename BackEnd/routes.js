////////// CONTROLLERS WEDDINGCLOUD//////

var ProjectControllerForm = require('./controllers/projectControllerForm');
// var ProjectControllerAdmin = require('./controllers/projectControllerAdmin');
var ProjectControllerLogin= require('./controllers/ProjectControllerLogIn');
var ProjectControllerBodas= require('./controllers/ProjectControllerBoda');
var ProjectControllerMensaje= require('./controllers/projectControllerMensajes');
var ProjectControllerinvitados = require('./controllers/projectControllerInvitados');
var ProjectControllerAdmin = require('./controllers/projectControllerAdmin2');



//JWT Y RUTA DE IMAGENES

var app = require('./app');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './public' });
const jwt = require('jsonwebtoken');

// app.get('/galeria', function (req, res) {
//     res.render('galeria');
// });

var UsersController = require('./controllers/projectControllerForm');
// app.post('/users/register', ProjectControllerForm.clienteAdd);

//rutas


var auth = function (req, res, next) {
    
    if (req.session.user) {
        return next();
    } else {
        return res.sendStatus(404);
    }
};

app.get('/todo', auth, function (req, res) {
    res.render('todo', {
        email: req.session.user.email
    });
});

////////////////////////WEDDINGCLOUD////////////////////


app.get('/invitados/get', ProjectControllerinvitados.getInvitados);
app.get('/invitados/getMofificar', ProjectControllerinvitados.getInvitadosModificar);
app.post('/invitados/post', ProjectControllerinvitados.postInvitados);
app.post('/invitados/delete', ProjectControllerinvitados.deleteInvitados);
app.post('/invitados/update', ProjectControllerinvitados.invitadoUpdate);
app.post('/invitados/updateMesa', ProjectControllerinvitados.invitadoUpdateMesa);
app.post('/invitados/avatar', multipartMiddleware, ProjectControllerinvitados.avatar);
app.get('/invitados/invitadoMesa', ProjectControllerinvitados.invitadosMesa);
app.get('/invitados/getInvFoto', ProjectControllerinvitados.getInvFoto);

app.post('/log/logIn', ProjectControllerLogin.loginUser);
app.get('/log/logOut', ProjectControllerLogin.logoutUser);

app.post('/boda', ProjectControllerBodas.postBoda);
app.get('/boda/novios', ProjectControllerBodas.getNovios);

app.post('/mensajes/getMensajes', ProjectControllerMensaje.getMensajes);
app.post('/mensajes/postMens', ProjectControllerMensaje.postInvitadosMens);
app.post('/mensajes/postMensaje', ProjectControllerMensaje.postMensaje);
app.post('/mensajes/postRespuesta', ProjectControllerMensaje.postRespuesta);
app.post('/mensajes/getRespuesta', ProjectControllerMensaje.getRespuestas);
app.post('/mensajes/mensajeDelete', ProjectControllerMensaje.mensajeDelete);
app.post('/mensajes/mesajePriv', ProjectControllerMensaje.postMensajePriv);
app.post('/mensajes/getmensajePriv', ProjectControllerMensaje.getMensajePriv);
app.post('/mensajes/getmensajePriv2', ProjectControllerMensaje.getMensajePriv2);
app.post('/mensajes/getInvPriv', ProjectControllerMensaje.getInvPriv);
app.post('/mensajes/privadoDelete', ProjectControllerMensaje.PrivadoDelete);
app.post('/mensajes/postRespuestaPriv', ProjectControllerMensaje.postRespuestaPriv);
app.post('/mensajes/getRespuestasPriv', ProjectControllerMensaje.getRespuestasPriv);

app.get('/admin/preboda', ProjectControllerAdmin.getPreboda);
app.get('/admin/confirmados', ProjectControllerAdmin.getConfirmados);
app.get('/admin/alergias', ProjectControllerAdmin.getAlergia);
app.get('/admin/noviofamilia', ProjectControllerAdmin.getNovioFamilia);
app.get('/admin/noviafamilia', ProjectControllerAdmin.getNoviaFamilia);
app.get('/admin/novioAmigos', ProjectControllerAdmin.getNovioAmigos);
app.get('/admin/noviaAmigos', ProjectControllerAdmin.getNoviaAmigos);



function veryfyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader != 'undefined' ){
        const bearer = bearerHeader.split(' ');
        const bearerToken= bearer[1];
        req.token=bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

module.exports = app;