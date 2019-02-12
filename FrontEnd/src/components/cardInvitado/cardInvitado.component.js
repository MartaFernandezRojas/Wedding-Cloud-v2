import React, { Component } from 'react';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBFileInput } from 'mdbreact';


export class CardInvitado extends Component {
  constructor(props) {
    super(props);

  }

  // componentDidMount() {
  //   var invitado = JSON.parse(localStorage.getItem("invitado"));
  //   this.setState(invitado);
  //   axios.get('http://localhost:3000/invitados/getMofificar', { params: { idb: invitado.id_boda, id: invitado.id } })
  //     .then(response => {
  //       this.setState(response.data[0])
  //       console.log(this.state)
  //     })
  // }
  insertAvatar() {
    console.log('hola')
  }

  render() {


    let invitado = this.props;
    return (
      <div>

        {/* <form id="formulario" enctype="multipart/form-data">
            <h5>Sube un archivo</h5>
            <input type='text' className="mr-3" id="tareaText" name="nombre">
              <input type='file' name="foto"/>
                <button className="waves-effect waves-light btn" type="submit" id="anadirTarea">Añadir Foto</button>
          </form> */}

        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage className="img-fluid" id="foto" src="http://www.oscarrodriguezvila.com/wp-content/uploads/2013/03/perfil-oscar2.jpg" waves />
            <div className="file-upload-wrapper">
              <input type="file" id="input-file-now" className="file-upload" />
            </div>
            <MDBCardBody>
              <MDBCardTitle>{invitado.props.nombre} {invitado.props.apellido}</MDBCardTitle>
              <MDBCardText>
                <p>Estos son tus datos de confirmación:</p>
                <ul>
                  <li className="list-group-item list-group-item-info">Email: {invitado.props.email}</li>
                  <li className="list-group-item list-group-item-info">Parte: {invitado.props.parte}</li>
                  <li className="list-group-item list-group-item-info">Confirmacion: {invitado.props.confirmacion}</li>
                  <li className="list-group-item list-group-item-info">Familia: {invitado.props.familia}</li>
                  <li className="list-group-item list-group-item-info">Fiesta preboda: {invitado.props.fiestapreboda}</li>
                  <li className="list-group-item list-group-item-info">Alergias: {invitado.props.id_alergia}</li>
                  <li className="list-group-item list-group-item-info">Comentarios: {invitado.props.comentarios}</li>
                </ul>
              </MDBCardText>
              <p>*Si quieres modificar cualquier dato, vuelve a rellenar el formulario</p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>


      </div>
    )
  }
}

