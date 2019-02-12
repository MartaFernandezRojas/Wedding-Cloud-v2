var con = require('../config');
var fs = require('fs');

    var controller = {
        getFotos: function (req, res) {
            let sql = 'SELECT * from fotos';
            con.query(sql, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.send(result);
                }
            });
        },

        getFotos2: function (req, res) {
            let sql = 'SELECT * from misfotos';
            con.query(sql, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.send(result);
                }
            });
        },

        galeriaAdd: function (req, res) {

        
            let sql = `INSERT INTO misfotos (nombre,url) VALUES ('${req.body.nombre}','${req.body.url}')`;
            con.query(sql, function (err, result) {
                if (err) {
                    return res.send(err);
                }
                else {
                    let mifoto = {
                        id: result.insertId,
                        nombre: req.body.nombre,
                        url: req.body.url
                    }
                    return res.send(mifoto);
                }
            });
        },


        galeriaDelete:function (req, res) {
            let sql = `DELETE FROM misfotos where id = ${req.body.id}`;
            con.query(sql, function (err, result) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.send(result);
                }
            });
        },


       
        galeriaAdd2:  function (req, res) {
            
            let oldPath = req.files.foto.path;
            let newPath = './public/img/' + req.files.foto.originalFilename;
            let todb = '../img/' + req.files.foto.originalFilename;
            fs.rename(oldPath, newPath, function (err) { 
        
            });
            let sql = `INSERT INTO misfotos (nombre,url) VALUES ('${req.body.nombre}','${todb}')`;
            con.query(sql, function (err, result) {
                if (err) {
                    return res.send(err);
                }
                else {
                    let mifoto = {
                        id: result.insertId,
                        nombre: req.body.nombre,
                        url: todb
                    }
                    return res.send(mifoto);
                }
            });
            
        }

    };


    module.exports = controller; 