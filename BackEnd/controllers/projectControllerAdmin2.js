var con = require('../config');

var controller = {
    getPreboda: function (req, res) {
        let sql = `select * from invitados where fiestapreboda=1 AND id_boda = ${req.body.id_boda}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getAlergia: function (req, res) {
        let sql = `select nombre,apellido,id_alergia,email from invitados where id_alergia!="null" AND id_boda = ${req.body.id_boda}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getConfirmados: function (req, res) {

        let sql = `select * from invitados where confirmacion=1 AND id_boda = ${req.body.id_boda}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getNovioFamilia: function (req, res) {
        let sql = `select * from invitados where parte='${req.query.parte1}' and familia ='Familia' AND id_boda = ${req.query.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getNoviaFamilia: function (req, res) {
        let sql = `select * from invitados where parte='${req.query.parte2}' and familia ='Familia' AND id_boda = ${req.query.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getNovioAmigos: function (req, res) {
        let sql = `select * from invitados where parte='${req.query.parte1}' and familia ='Amigo'AND id_boda = ${req.query.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getNoviaAmigos: function (req, res) {
        let sql = `select * from invitados where parte='${req.query.parte2}' and familia ='Amigo' AND id_boda = ${req.query.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },

};

// 
module.exports = controller; 