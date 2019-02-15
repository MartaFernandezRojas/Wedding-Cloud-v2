import React, { Component } from 'react';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBFileInput } from 'mdbreact';


export class CardInvitado extends Component {
  constructor(props) {
    super(props);
  }

  insertAvatar(event) {
    var invitado = JSON.parse(localStorage.getItem("invitado"));
    console.log(event.target.files[0])

const fd=new FormData();
fd.append('image',event.target.files[0],event.target.files[0].name); 
fd.append('id', invitado.id);

    axios.post('http://localhost:3000/invitados/avatar',fd)
      .then(response => {
        console.log('ok')
      })
  }
  render() {
    let invitado = this.props;
    return (
      <div>
        <MDBCol>
          <MDBCard style={{ width: "22rem" }}>
          <form>
            <MDBCardImage className="img-fluid" id="foto" src="http://www.oscarrodriguezvila.com/wp-content/uploads/2013/03/perfil-oscar2.jpg" waves />
            <div className="file-upload-wrapper">
              <input type="file" id="input-file-now" className="file-upload" name="foto"  onChange={this.insertAvatar}/>
              <MDBBtn className="waves-effect waves-light blue btn" id="anadirTarea" >Añadir Foto</MDBBtn>
            </div>
            </form>
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

