var con = require('../config');

var controller = {
    getMensajes: function (req, res) {
        let sql = `select m.id as id_men,m.titulo, m.mensaje, m.fecha,m.likes, i.id as id_inv,i.nombre, i.apellido, i.familia, i.parte, i.rol  from mensajes m inner join invitados i on (i.id = m.id_invitado ) where i.id_boda=${req.body.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);

            }
        });
    },
    postInvitadosMens: function (req, res) {
        // jwt.verify(req.token, 'secretkey', (err, authData) => {
        //     if (err) {
        //         res.sendStatus(403);
        //     } else {
        let sql = `SELECT id,nombre,apellido,email,confirmacion,parte,familia,id_alergia,fiestapreboda,mesa,comentarios,rol from invitados where id_boda = ${req.body.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {

                return res.send(result);
            }
        });
    },
    postMensaje: function (req, res) {
        let sql = `INSERT INTO mensajes (id_invitado,titulo,mensaje) VALUES (${req.body.id_invitado},'${req.body.titulo}','${req.body.mensaje}')`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
                console.log(err)
            }
            else {
                let mensaje = {
                    id: result.insertId,
                    id_invitado: req.body.id_invitado,
                    titulo: req.body.titulo,
                    mensaje: req.body.mensaje,
                    fecha: req.body.fecha
                }
                return res.send(mensaje);
            }
        });
    },
    postLike:function(req, res) {

    },

    postRespuesta: function(req,res){
        let sql=` insert into respuestas (id_mensaje,id_invitado,mensaje) values (${req.body.id_mensaje},${req.body.id_invitado},'${req.body.mensaje}')`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
                console.log(err)
            }
            else {
                let respuesta = {
                    id: result.insertId,
                    id_mensaje:req.body.id_mensaje,
                    id_invitado: req.body.id_invitado,
                    mensaje: req.body.mensaje,
                    fecha: req.body.fecha
                }
                return res.send(respuesta);
            }
        });



    }

}
module.exports = controller;