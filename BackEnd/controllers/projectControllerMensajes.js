var con = require('../config');

var controller = {
    getMensajes: function (req, res) {
        let sql = `select m.id as id_men,m.titulo, m.mensaje, m.fecha, i.id as id_inv,i.nombre, i.apellido, i.familia, i.parte  from mensajes m inner join invitados i on (i.id = m.id_invitado ) where i.id_boda=${req.body.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);

            }
        });
    }
};

module.exports = controller;