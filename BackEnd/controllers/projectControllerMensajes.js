var con = require('../config');

var controller = {
    getMensajes: function (req, res) {
        let sql = `select m.id as id_men,m.titulo, m.mensaje, m.fecha,m.likes, i.id as id_inv,i.nombre, i.apellido, i.familia, i.parte, i.rol,i.url  from mensajes m inner join invitados i on (i.id = m.id_invitado ) where i.id_boda=${req.body.idb}`;
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
        let sql = `SELECT id,nombre,apellido,email,confirmacion,parte,familia,id_alergia,fiestapreboda,mesa,comentarios,rol,url from invitados where id_boda = ${req.body.idb}`;
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
    postLike: function (req, res) {

    },

    postRespuesta: function (req, res) {

        let sql = ` insert into respuestas (id_mensaje,id_invitado,mensaje) values (${req.body.id_mensaje},${req.body.id_invitado},'${req.body.mensaje}')`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);

            }
            else {
                let respuesta = {
                    id: result.insertId,
                    id_mensaje: req.body.id_mensaje,
                    id_invitado: req.body.id_invitado,
                    mensaje: req.body.mensaje,
                    fecha: req.body.fecha
                }
                return res.send(respuesta);
            }
        });

    },
    getRespuestas: function (req, res) {
        let sql = `select r.id as id_resp,r.id_mensaje,r.id_invitado,r.mensaje,r.fecha, i.id=id_invitado, i.nombre, i.apellido from respuestas r

        inner join invitados i on (i.id=r.id_invitado) where id_mensaje=${req.body.id_mensaje}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);

            }
        });
    },
    mensajeDelete: function (req, res) {

        let sql = `DELETE FROM mensajes where id=${req.body.id_mensaje}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    postMensajePriv: function (req, res) {
        let sql = ` insert into mensajePriv (id_invReceptor,id_invitado,mensaje) values (${req.body.id_invReceptor},${req.body.id_invitado},'${req.body.mensaje}')`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)

                return res.send(err);
            }
            else {
                let privado = {
                    id: result.insertId,
                    id_invReceptor: req.body.id_invReceptor,
                    id_invitado: req.body.id_invitado,
                    mensaje: req.body.mensaje,
                    fecha: req.body.fecha
                }
                return res.send(privado);
            }
        });
    },
    getMensajePriv: function (req, res) {
        let sql = `select * from mensajePriv where id_invReceptor=${req.body.id_invReceptor}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    },
    getMensajePriv2: function (req, res) {
        let sql = `select * from mensajePriv where id_invitado=${req.body.id_invitado}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    },
    getInvPriv: function (req, res) {
        let sql = `SELECT nombre,apellido,parte,familia,mesa from invitados where id = ${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
              
                return res.send(result);
            }
        });
    },
    PrivadoDelete: function (req, res) {
        let sql = `DELETE FROM mensajePriv where id=${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    postRespuestaPriv: function (req, res) {
        let sql = ` insert into respuestasPriv (id_mensajePriv,id_invitado,mensaje) values (${req.body.id_mensajePriv},${req.body.id_invitado},'${req.body.mensaje}')`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            }
            else {
                let respuesta = {
                    id: result.insertId,
                    id_mensajePriv: req.body.id_mensajePriv,
                    id_invitado: req.body.id_invitado,
                    mensaje: req.body.mensaje,
                    fecha: req.body.fecha
                }
                return res.send(respuesta);
            }
        });

    },
    getRespuestasPriv: function (req, res) {
        let sql = `select r.id as id_resp,r.id_mensajePriv,r.id_invitado,r.mensaje,r.fecha, i.id=id_invitado, i.nombre, i.apellido from respuestasPriv r
        inner join invitados i on (i.id=r.id_invitado) where id_mensajePriv=${req.body.id_mensajePriv}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);

            }
        });
    },

}
module.exports = controller;