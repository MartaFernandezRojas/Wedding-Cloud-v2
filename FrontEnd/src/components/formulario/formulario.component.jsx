// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ResultadoInvitado } from '../resultadoInvitado/resultadoInvitado.component'
import styles from '../../routes/router/router.styles.css';
import stylesform from './formulario.styles.css';
import { style } from 'react-toastify';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

///////////// Component ////////////////
export class Formulario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_boda: null,
      nombre: '',
      apellido: '',
      email: '',
      password: '',
      rol: 0,
      redirect: false,
      redirect2: false,
      modal: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

  }
  insertUser() {

    axios.post('http://localhost:3000/invitados/post', this.state)
      .then(response => {

        if (response.data.rol == 1 || response.data.rol == 0) {

          let user = {
            email: this.state.email,
            password: this.state.password
          }
          axios.post('http://localhost:3000/log/logIn', user)
            .then(response => {
              if (response.status === 200) {
                if (response.data.rol == 0) {
                  localStorage.setItem('invitado', JSON.stringify(response.data));
                  this.setState({ redirect: true })
                }
                else if (response.data.rol == 1) {
                  localStorage.setItem('invitado', JSON.stringify(response.data));
                  this.setState({ redirect2: true })
                }
              
              }

            })
        }
      })
  }
  render() {
    const redireccion = this.state.redirect ? <Redirect from="/" to="/FormularioConfirmacion" /> : null
    const redireccion2 = this.state.redirect2 ? <Redirect from="/" to="/gestionInvitados" /> : null
    return (
      <div className={stylesform.container}>
        <h5 className={stylesform.titulo}>Registro de Invitado</h5>
        <form >
          <label >ID Boda:</label>
          <input className="form-control" id="id_boda" type="text" name="boda" placeholder="ID Boda" value={this.state.id_boda} onChange={this.handleChange} />
          <label form="nombre">Nombre:</label>
          <input className="form-control" id="nombre" type="text" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleChange} />
          <label form="apellido">Apellido:</label>
          <input className="form-control" id="apellido" type="text" name="apellido" placeholder="Apellido" value={this.state.apellido} onChange={this.handleChange} />
          <label form="email">Email o Usuario:</label>
          <input className="form-control validate" id="email" type="email" name="Email" placeholder="Email " value={this.state.email} onChange={this.handleChange} />
          <label form="password">Passsword:</label>
          <input className="form-control" id="password" type="password" name="Password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          <input type='button' style={{ marginTop: "1rem" }} onClick={() => {
            this.insertUser();
          }
          } className={styles.button} value='Confirmar' />
          <MDBContainer className={stylesform.modals}>
            <MDBModal isOpen={this.state.modal}>
              <MDBModalHeader >Error al crear la boda</MDBModalHeader>
              <MDBModalBody>
                Revisatus datos
                            </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
              </MDBModalFooter>
            </MDBModal>
          </MDBContainer>
        </form>
        {redireccion}
        {redireccion2}
      </div>
    );
  }
}

