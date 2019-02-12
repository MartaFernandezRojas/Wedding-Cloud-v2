var con = require('../config');
var bcrypt = require('bcrypt-nodejs');

var controller = {
    clienteAdd: function (req, res) {
        let password = req.body.password;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, null, function (err, hash) {
                console.log(hash);
                password = hash;
                let sql = `INSERT INTO cliente (nombre,Apellido,email,telefono,password) VALUES ('${req.body.nombre}','${req.body.Apellido}','${req.body.email}','${req.body.telefono}','${password}')`;
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log(err);
                        return res.send(err);
                    }
                    else {
                        let cliente = {
                            id: result.insertId,
                            nombre: req.body.nombre,
                            Apellido: req.body.Apellido,
                            email: req.body.email,
                            telefono: req.body.telefono,
                            password: req.body.password
                        }
                        res.send(cliente);
                    }
                });
            });
        })
    },

    clienteGet: function (req, res) {
        let sql = 'SELECT * from cliente';
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);

            }
        });
    },
    clienteDelete: function (req, res) {
        let sql = `DELETE FROM cliente where id = ${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    },
    clienteUpdate: function (req, res) {
        let sql = `UPDATE cliente set nombre='${req.body.nombre}',Apellido='${req.body.Apellido}',email='${req.body.email}',telefono='${req.body.telefono}' where id = ${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                let cliente = {
                    id: result.insertId,
                    nombre: req.body.nombre,
                    Apellido: req.body.Apellido,
                    email: req.body.email,
                    telefono: req.body.telefono,
                }
                res.send(cliente);
            }
        });
    },

    loginUser: function (req, res) {
        let sql = `SELECT * from cliente where email ='${req.body.email}'`;

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
                            req.session.user = {
                                'user': result[0].nombre,
                                'email': result[0].email,
                                'rol':result[0].rol,
                                'id':result[0].id
                            }
                    
                            if (iguales) {
                                return res.send(result);
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