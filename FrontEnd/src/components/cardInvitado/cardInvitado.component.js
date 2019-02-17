//////////IMPORTS/////////

import React, { Component } from 'react';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCol } from 'mdbreact';


/////////COMPONENTE///////////////


export class CardInvitado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitado: {},
      invitados: [],
      url: '',
    }
  }

  componentDidMount() {
    var invitado = JSON.parse(localStorage.getItem("invitado"));
    this.state.invitado = invitado;
    axios.get('http://localhost:3000/invitados/invitadoMesa', { params: { idb: invitado.id_boda, m: invitado.mesa } })
      .then(response => {
        this.setState({ invitados: response.data })
      })
  }


  insertAvatar = (event) => {
    var invitado = JSON.parse(localStorage.getItem("invitado"));
    const fd = new FormData();
    fd.append('image', event.target.files[0], event.target.files[0].name);
    fd.append('id', invitado.id);

    axios.post('http://localhost:3000/invitados/avatar', fd)
      .then(response => {
      })

    axios.get('http://localhost:3000/invitados/getInvFoto', { params: { id: invitado.id } })
      .then(response => {
        this.setState({ url: response.data[0].url })
      })
  }


  render() {
    let invitado = this.props;
    return (
      <div>
        <MDBCol style={{ marginTop: "50px", display: "flex" }}>
          <MDBCard color="blue-grey darken-1" style={{ width: "82%" }}>
            <form>
              <MDBCardImage className="img-fluid" id="foto" src="https://www.websa100.com/wp-content/uploads/2016/05/foto-de-perfil-adecuada.jpg" waves />
              <div className="file-upload-wrapper">
                <input type="file" id="input-file-now" className="file-upload" name="foto" onChange={this.insertAvatar} />
                <MDBBtn color="blue-grey" size="sm" className="waves-effect waves-light btn" id="anadirTarea" >Añadir Foto</MDBBtn>
              </div>
            </form>
            <MDBCardBody>
              <p style={{ fontSize: "25px", color: "white" }}>{invitado.props.nombre} {invitado.props.apellido}</p>
              <MDBCardText>
                <p style={{ color: "white" }}>Estos son tus datos de confirmación:</p>
                <ul>
                  <li style={{ height: "40px" }} className="list-group-item list-group-item-info">Email: {invitado.props.email}</li>
                  <li style={{ height: "40px" }} className="list-group-item list-group-item-info">Parte: {invitado.props.parte}</li>
                  <li style={{ height: "40px" }} className="list-group-item list-group-item-info">Confirmacion: {invitado.props.confirmacion}</li>
                  <li style={{ height: "40px" }} className="list-group-item list-group-item-info">Familia: {invitado.props.familia}</li>
                  <li style={{ height: "40px" }} className="list-group-item list-group-item-info">Fiesta preboda: {invitado.props.fiestapreboda}</li>
                  <li style={{ height: "40px" }} className="list-group-item list-group-item-info">Alergias: {invitado.props.id_alergia}</li>
                  <li style={{ height: "40px" }} className="list-group-item list-group-item-info">Comentarios: {invitado.props.comentarios}</li>
                </ul>
              </MDBCardText>
              <p style={{ color: "white" }}>*Si quieres modificar cualquier dato, vuelve a rellenar el formulario</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </div>
    )
  }
}

