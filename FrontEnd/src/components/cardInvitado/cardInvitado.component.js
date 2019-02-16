import React, { Component } from 'react';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBFileInput } from 'mdbreact';
import { TuMesa, } from '@Components';


export class CardInvitado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invitado: {},
      invitados: []
    }
  }
  componentDidMount() {
    var invitado = JSON.parse(localStorage.getItem("invitado"));
    this.state.invitado = invitado;
    axios.get('http://localhost:3000/invitados/invitadoMesa', { params: { idb: invitado.id_boda, m: invitado.mesa } })
      .then(response => {
        this.setState({ invitados: response.data })
        console.log(this.state.invitados)
      })
  }

  insertAvatar(event) {
    var invitado = JSON.parse(localStorage.getItem("invitado"));


    const fd = new FormData();
    fd.append('image', event.target.files[0], event.target.files[0].name);
    fd.append('id', invitado.id);

    axios.post('http://localhost:3000/invitados/avatar', fd)
      .then(response => {
        console.log('ok')
      })
  }
  render() {
    let invitado = this.props;
    return (
      <div>
        <MDBCol>
          <MDBCard style={{ width: "100%" }}>
            <form>
              <MDBCardImage className="img-fluid" id="foto" src="http://www.oscarrodriguezvila.com/wp-content/uploads/2013/03/perfil-oscar2.jpg" waves />
              <div className="file-upload-wrapper">
                <input type="file" id="input-file-now" className="file-upload" name="foto" onChange={this.insertAvatar} />
                <MDBBtn className="waves-effect waves-light blue btn" id="anadirTarea" >Añadir Foto</MDBBtn>
              </div>
            </form>
            <MDBCardBody>
              <h4>{invitado.props.nombre} {invitado.props.apellido}</h4>
              <MDBCardText>
                <p>Estos son tus datos de confirmación:</p>
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
              {/* { <TuMesa props={this.state.invitado}/> } */}
              <p>*Si quieres modificar cualquier dato, vuelve a rellenar el formulario</p>
              <p>Personas asignadas tu mesa </p>
              <ul>
                {this.state.invitados.map((e, index) => {
                  return (<div>
                    <li style={{ height: "40px" }} className="list-group-item list-group-item-warning">{e.nombre} {e.apellido} - {e.familia} de {e.parte}</li>
                  </div>
                  )
                })}
              </ul>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </div>
    )
  }
}

