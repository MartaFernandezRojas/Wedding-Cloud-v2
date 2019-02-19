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
    console.log(invitado);
    this.setState({
      invitado
    })

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
        this.setState({ invitado: { ...this.state.invitado, url: response.data.url } })
        invitado.url = response.data.url;
        localStorage.setItem('invitado', JSON.stringify(invitado));
      })

    // axios.get('http://localhost:3000/invitados/getInvFoto', { params: { id: invitado.id } })
    //   .then(response => {
    //     this.setState({ url: response.data[0].url })
    //     console.log(response.data[0].url)
    //   })
  }


  render() {
    let invitado = this.props;
    return (
      <div>
        <MDBCol style={{ marginTop: "50px", display: "flex" }}>
          <MDBCard color="blue-grey darken-1" style={{ width: "100%" }}>
            <form>
              <MDBCardImage className="img-fluid" id="foto" src={`http://localhost:3000/${this.state.invitado.url}`} waves />
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"
                  onChange={this.insertAvatar}
                />
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                  Sube tu foto
                </label>
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
    
