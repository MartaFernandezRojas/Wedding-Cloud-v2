var con = require('../config');
var bcrypt = require('bcrypt-nodejs');

var controller = {
    adminGet: function (req, res) {
        let sql = 'SELECT * from cliente';
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);

            }
        });
    }, 
    adminUpdate: function (req, res) {
        let sql = `UPDATE cliente set rol='${req.body.rol}' where id = ${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                let cliente = {
                    rol: req.body.rol,
                }
                res.send(cliente);
            }
        });
    }

};

module.exports = controller;