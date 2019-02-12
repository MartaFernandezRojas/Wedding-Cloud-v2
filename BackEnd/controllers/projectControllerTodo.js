var con = require('../config');

var controller = {

    todoget: function (req, res) {
        let sql = 'SELECT * from tareas';
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);

            }
        });
    },

    todoAdd: function (req, res) {
        let sql = `INSERT INTO tareas (nombre_tarea,estado_tarea,id_cliente) VALUES ('${req.body.nombre_tarea}','${req.body.estado_tarea}',${req.session.user.id})`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                let tarea = {
                    id: result.insertId,
                    nombre_tarea: req.body.nombre_tarea,
                    estado_tarea: req.body.estado_tarea
                }
                res.send(tarea);
            }
        });
    },

    todoUpdate: function (req, res) {
        let sql = `UPDATE tareas set estado_tarea='${req.body.estado_tarea}' where id=${req.body.id}`;
        con.query(sql, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                let tarea = {
                    id: req.body.id,
                    estado_tarea: req.body.estado_tarea,
                    affectedRows: result.affectedRows
                }
                res.send(tarea);
            }
        });
    },
    getTareasUser: function (req, res) {
        if (req.session.user) {
            let sql = `SELECT * from tareas where id_cliente = ${req.session.user.id}`;
            con.query(sql, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.send(result);
                }
            });
        } else {
            return res.send('No existe un login de usuario')
        }
    }
};

module.exports = controller;