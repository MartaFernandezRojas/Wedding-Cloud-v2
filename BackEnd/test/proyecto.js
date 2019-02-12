var routes = require('../routes');
var con = require ('../config');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);


describe('/GET proyecto', () => {
    it('Debería devolverme un objecto' , (done)=> {
      chai.request(routes)
          .get('/todo/add')
          .end((err, res) => {
                res.body.should.be.a('object');
            done();
          });
    });
    it('Debería devolverme todos los proyectos', (done)=> {
        chai.request(routes)
            .get('/todo/get')
            .end((err, res) => {
                  res.body.should.be.a('array');
              done();
            });
      });
  });

describe('/POST tarea', () => {
    it('Debería insertar una tarea', (done) => {
        let proyecto = {
            nombre_tarea: "Nuevo tarea",
            estado_tarea:"Hola"
        }
        chai.request(routes)
            .post('/todo/add')
            .send(proyecto)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').be.a('number');
                res.body.should.have.property('nombre_tarea').be.a('string');
                res.body.should.have.property('estado_tarea').be.a('string');
                done();
            });
    });
    it('Debería actualizar una tarea', (done) => {
        let sql = `INSERT INTO tareas (nombre_tarea) VALUES ('test')`;
        con.query(sql, function (err, result) {
            let proyecto = { id: result.insertId, nombre: 'Update' };
            chai.request(routes)
                .post('/todo/update')
                .send(proyecto)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('affectedRows').eql(1);
                    done();
                });
        });
    });
});

