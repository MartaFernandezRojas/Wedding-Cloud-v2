var con = require('../config');
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const fs = require ('fs');

var controller = {
    getInvitados: function (req, res) {
        // jwt.verify(req.token, 'secretkey', (err, authData) => {
        //     if (err) {
        //         res.sendStatus(403);
        //     } else {
        let sql = `SELECT id,nombre,apellido,email,confirmacion,parte,familia,id_alergia,fiestapreboda,mesa,comentarios,url from invitados where id_boda = ${req.query.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {

                return res.send(result);
            }
        });
    },
    // })ojo que tienes que añadir un corchete!!!!!!!!

    getInvitadosModificar: function (req, res) {
        // jwt.verify(req.token, 'secretkey', (err, authData) => {
        //     if (err) {
        //         res.sendStatus(403);
        //     } else {

        let sql = `SELECT * from invitados where id_boda=${req.query.idb} and id=${req.query.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },

    postInvitados: function (req, res) {
        let password = req.body.password;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, null, function (err, hash) {
                password = hash;
                let sql = `INSERT INTO invitados (nombre,apellido,email,password,rol,id_boda,mesa) VALUES ('${req.body.nombre}','${req.body.apellido}','${req.body.email}','${password}','${req.body.rol}','${req.body.id_boda}',0)`;
                con.query(sql, function (err, result) {
                    if (err) {
                        return res.send(err);
                    }
                    else {
                        let invitado = {
                            id: result.insertId,
                            nombre: req.body.nombre,
                            apellido: req.body.apellido,
                            email: req.body.email,
                            rol: req.body.rol,
                            id_boda: req.body.id_boda,
                            mesa: 0
                        }
                        return res.send(invitado);
                    }
                });
            });
        });
    },
    invitadoUpdate: function (req, res) {
        let sql = `UPDATE invitados set nombre='${req.body.nombre}',apellido='${req.body.apellido}',email='${req.body.email}',id_alergia='${req.body.id_alergia}', confirmacion='${req.body.confirmacion}',parte='${req.body.parte}',familia='${req.body.familia}', fiestapreboda='${req.body.fiestapreboda}',comentarios='${req.body.comentarios}' where id = ${req.body.id} and id_boda=${req.body.id_boda}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                let invitado = {
                    id: result.insertId,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    id_alergia: req.body.id_alergia,
                    confirmacion: req.body.confirmacion,
                    parte: req.body.parte,
                    familia: req.body.familia,
                    fiestapreboda: req.body.fiestapreboda,
                    comentarios: req.body.comentarios
                }
                res.send(invitado);
            }
        });
    },

    invitadoUpdateMesa: function (req, res) {
        let sql = `UPDATE invitados set mesa=${req.body.mesa} where id = ${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                let invitado = {
                    id: result.insertId,
                    mesa: req.body.mesa
                }
                res.send(invitado);

            }
        });
    },

    deleteInvitados: function (req, res) {
        let sql = `DELETE FROM invitados where id = ${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },

    avatar: function (req, res) {

        let oldPath = req.files.image.path;
        console.log(req.files.image.originalFilename)
        let newPath = './public/img/' + req.files.image.originalFilename;
        let todb = 'img/'+ req.files.image.originalFilename;
        fs.rename(oldPath, newPath, function (err) {
        });
        let sql = `UPDATE invitados set url='${todb}' where id = ${req.body.id} `;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            }
            else {
                let invitado = {
                    id: result.insertId,
                    url: todb
                }
                return res.send(invitado);
            }
        });

    },
    invitadosMesa: function (req, res) {
        let sql = `SELECT * from invitados where id_boda = ${req.query.idb} AND mesa= ${req.query.m}`;
        con.query(sql, function (err, result) {
            if (err) {
                console.log(err)
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    },
    getInvFoto: function (req, res) {
        // jwt.verify(req.token, 'secretkey', (err, authData) => {
        //     if (err) {
        //         res.sendStatus(403);
        //     } else {
        let sql = `SELECT * from invitados where id = ${req.query.id}`;
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