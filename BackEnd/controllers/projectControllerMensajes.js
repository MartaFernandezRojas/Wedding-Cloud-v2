var con = require('../config');

var controller = {
    getMensajes: function (req, res) {
        let sql = `select m.id as id_men,m.titulo, m.mensaje, m.fecha, i.id as id_inv,i.nombre, i.apellido, i.familia, i.parte, i.rol  from mensajes m inner join invitados i on (i.id = m.id_invitado ) where i.id_boda=${req.body.idb}`;
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
};

module.exports = controller;