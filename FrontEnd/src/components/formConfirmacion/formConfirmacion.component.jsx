// Import libraries
import React, { Component } from 'react';
import axios from 'axios';


//Import Stilos
import styles2 from './formConfirmacion.styles.css';
import styles from '../../routes/router/router.styles.css';
import { NavbarInvitados } from '../navbarInvitados/navbarInvitados.component'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { style } from 'react-toastify';
import { CardInvitado } from '../cardInvitado/cardInvitado.component';
import Card from '../../../node_modules/react-materialize/lib/Card';


///////////// Component ////////////////
export class FormularioConfirmacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmacion: '',
      id_alergia: '',
      parte: '',
      familia: '',
      fiestapreboda: '',
      comentarios: ' ',
      novio1: '',
      novio2: '',
      mesa: '',
      modal: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  show() {
    // console.log(this.state);
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  insertUser() {

    // console.log(document.getElementById(confirmacion).value);
    let user = {
      id: this.state.id,
      id_boda: this.state.id_boda,
      nombre: this.state.nombre,
      apellido: this.state.apellido,
      email: this.state.email,
      confirmacion: this.state.confirmacion,
      id_alergia: this.state.id_alergia,
      parte: this.state.parte,
      familia: this.state.familia,
      fiestapreboda: this.state.fiestapreboda,
      comentarios: this.state.comentarios

    }
    axios.post('http://localhost:3000/invitados/update', user)
      .then(response => {

      })
      this.toggle();
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value

    });
  }
  componentDidMount() {
    var invitado = JSON.parse(localStorage.getItem("invitado"));
    this.setState(invitado);
    axios.get('http://localhost:3000/invitados/getMofificar', { params: { idb: invitado.id_boda, id: invitado.id } })
      .then(response => {
        this.setState(response.data[0])

      })
    axios.get('http://localhost:3000/boda/novios', { params: { idb: invitado.id_boda } })
      .then(response => {
        this.setState({ novio1: response.data[0].novio1 })
        this.setState({ novio2: response.data[0].novio2 })
      })
  }
  render() {
    return (
      <div className={styles2.fondo}>
        <NavbarInvitados />
        <div className="container">
          <div className="row">
            <div className="col l6 mx-5">
              <p className={styles2.titulos} style={{ fontSize: "25px", marginTop:"20px",color:"white"}}>Bienvenid@ {this.state.nombre} {this.state.apellido}</p>
              <p className={styles2.titulos} style={{ fontSize: "15px",color:"white" }}> Boda de {this.state.novio1} y {this.state.novio2} con ID:{this.state.id_boda}</p>
              <h6 style={{ fontSize: "15px",color:"white" }}>Rellena el formulario de confirmación</h6>

              <form >
                <label className={styles2.label} style={{ color:"white" }} form="nombre">Nombre</label>
                <input className="form-control" id="nombre" type="text" name="nombre" placeholder={this.state.invitados ? this.state.invitados.nombre : 'null'} value={this.state.nombre} onChange={this.handleChange} />
                <label className={styles2.label} style={{ color:"white" }} form="apellido">Apellido</label>
                <input className="form-control" id="apellido" type="text" name="apellido" placeholder={this.state.invitados ? this.state.invitados.apellido : 'null'} value={this.state.apellido} onChange={this.handleChange} />
                <label className={styles2.label} style={{ color:"white" }}  form="email">Email</label>
                <input className="form-control validate" id="email" type="email" name="Email" placeholder={this.state.invitados ? this.state.invitados.email : 'null'} value={this.state.email} onChange={this.handleChange} />
                <p style={{ fontSize: "20px",color:"white" }} >Confirmación de asistencia:</p>
                <div className="form-check">
                  <input className="form-check-input" name="confirmacion" id="confirmacion" type="radio" checked={this.state.confirmacion === 'Confirmado'} value='Confirmado' onChange={this.handleChange} />
                  <label className={styles2.label}  style={{ color:"white" }} for="Si puedo">Si</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" name="confirmacion" id="confirmacion" type="radio" checked={this.state.confirmacion === 'Ausente'} value='Ausente' onChange={this.handleChange} />
                  <label className={styles2.label}  style={{ color:"white" }} for="Si puedo">No</label>
                </div>
                <p style={{ fontSize: "20px",color:"white" }}>Alergia o intolerancia</p>
                <div className="form-check">
                  <input className="form-check-input validate" id="id_alergia" type="radio" name="alergia" checked={this.state.id_alergia === 'Celiaco'} value='Celiaco' onChange={this.handleChange} />
                  <label className={styles2.label} style={{ color:"white" }} for="Si puedo">Celiaco</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input validate" id="id_alergia" type="radio" name="alergia" checked={this.state.id_alergia === 'Lactosa'} value='Lactosa' onChange={this.handleChange} />
                  <label className={styles2.label} style={{ color:"white" }} for="Si puedo">Lactosa</label>
                </div>
                <p style={{ fontSize: "20px",color:"white" }}>Vienes de parte de:</p>
                <div className="form-check">
                  <input className="form-check-input validate" id="parte" type="radio" name="parte" checked={this.state.parte === this.state.novio1} value={this.state.novio1} onChange={this.handleChange} />
                  <label className={styles2.label}style={{ color:"white" }} for="Si puedo">{this.state.novio1}</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input validate" id="parte" type="radio" name="parte" checked={this.state.parte === this.state.novio2} value={this.state.novio2} onChange={this.handleChange} />
                  <label className={styles2.label} style={{ color:"white" }} for="Si puedo">{this.state.novio2}</label>
                </div>
                <p style={{ fontSize: "20px",color:"white" }}>Familia o Amigo</p>
                <div className="form-check">
                  <input className="form-check-input validate" id="familia" type="radio" name="familia" checked={this.state.familia === 'Familia'} value='Familia' onChange={this.handleChange} />
                  <label className={styles2.label} style={{ color:"white" }} for="Si puedo">Familia</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input validate" id="familia" type="radio" name="familia" checked={this.state.familia === 'Amigo'} value='Amigo' onChange={this.handleChange} />
                  <label className={styles2.label} style={{ color:"white" }} for="Si puedo">Amigo</label>
                </div>
                <p style={{ fontSize: "20px",color:"white" }}>Asistiras a nuestra gran fiesta preboda</p>
                <div className="form-check">
                  <input className="form-check-input validate" id="fiestapreboda" type="radio" name="fiestapreboda" checked={this.state.fiestapreboda === 'Fiesta'} value='Fiesta' onChange={this.handleChange} />
                  <label className={styles2.label} style={{ color:"white" }} for="Si puedo">Si, a darlo todo</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input validate" id="fiestapreboda" type="radio" name="fiestapreboda" checked={this.state.fiestapreboda === 'No Fiesta'} value='No Fiesta' onChange={this.handleChange} />
                  <label className={styles2.label} style={{ color:"white" }} for="Si puedo">No, me reservo para la fiesta</label>
                </div>
                <div>
                  <p style={{ fontSize: "20px",color:"white" }}>DEJANOS TUS COMENTARIOS, EMOCIONES, PETICIONES DE CANCIONES....</p>

                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon">
                        <i className="fas fa-pencil-alt prefix"></i>
                      </span>
                    </div>
                    <textarea className="form-control" id="comentarios" value={this.state.comentarios} onChange={this.handleChange} rows="4"></textarea>
                  </div>
                </div>
                <MDBBtn color="blue-grey" className="waves-effect waves-light btn" type='button' onClick={() => {
                  this.insertUser();
                }
                } value='Confirmar'>Confirmar</MDBBtn>
               
                  <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalBody>
                      Formulario Enviado
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="secondary" onClick={this.toggle}>Cerrar</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
              </form>
            </div>
            <div className="col l6" >
              <CardInvitado props={this.state} />
            </div>
          </div>
        </div>
      </div >

    );
  }
}

