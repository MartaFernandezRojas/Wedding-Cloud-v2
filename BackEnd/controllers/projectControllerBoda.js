var con = require('../config');

var controller = {
    postBoda: function (req, res) {
        let sql = `INSERT INTO bodas (novio1,novio2) VALUES ('${req.body.novio1}','${req.body.novio2}')`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            }
            else {
                let boda = {
                    id: result.insertId,
                    novio1: req.body.novio1,
                    novio2: req.body.novio2
                    
                }
                return res.send(boda);
            }
        });
    },
    getNovios: function (req, res) {
        let sql = `select * from bodas where id = ${req.query.idb}`;
        con.query(sql, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                return res.send(result);
            }
        });
    }
};

// 
module.exports = controller; 