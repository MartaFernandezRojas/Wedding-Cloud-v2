var con = require('../config');

var controller = {

    example: function (req, res) {

        let sql = `SELECT * from tarea where id=${req.query.id}`;
        con.query(sql, function (err, resultado) {
            if (err) {
                res.send(err);
            } else {
                res.render('example', {
                    resultado: result
                });
            }

        });

     }
};


module.exports = controller;