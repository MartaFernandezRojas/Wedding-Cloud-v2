var con = require('../config');
var bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

var controller = {
    loginUser: function (req, res) {
        let sql = `SELECT * from invitados where email ='${req.body.email}'`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            }
            else {
                if (result == "") {
                    return res.send('Email introducido no válido');
                } else {
                    bcrypt.compare(req.body.password, result[0].password, function (err, iguales) {
                        if (err) {
                            return res.send(err)
                        } else {
                            if (iguales) {
                                jwt.sign(req.body, 'secretkey', (err, token) => {
                                    res.json({
                                        token,
                                        ...result[0]
                                    });
                                });
                            } else {
                                return res.send('La contraseña no es correcta')
                            };
                        };
                    });
                };
            };
        });
    
    },
    logoutUser: function(req, res){
        if(req.session.user){
            req.session.destroy();
            return res.send('ok');
        }else{
            return res.send('No existe un login de usuario')
        }
    }
};

    module.exports = controller;