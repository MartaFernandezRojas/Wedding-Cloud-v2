////////////IMPORTS////////////////

import React, { Component } from 'react';
import axios from 'axios';
import { MDBCard, MDBCol } from 'mdbreact';
import { Invitado,ConnectINV } from '@Components';
import styles from './cardInvitadoMesa.css'

/////////COMPONENTE///////////////

export class CardInvitadoMesa extends Component {
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
    var escrito = false;
    return (
      <div>
        <MDBCol style={{ marginTop: "50px", }}>
          <MDBCard className={styles.fondo} style={{ width: "100%", padding: "10px"}}>
            <p style={{ fontSize: "20px", color: "white" }}>Personas asignadas tu mesa</p>
            {this.state.invitados.map(m => {
              if (invitado.props.mesa != 0 && invitado.props.mesa != 98 && m.confirmacion == "Confirmado" && invitado.props.id!=m.id) {
                return <ConnectINV style={{ width: "5px" }} key={m.id} invitado={m} />
              } else if ((invitado.props.mesa == 0 || invitado.props.mesa == 98) && escrito == false) {
                escrito = true
                return (<p>Aun no tienes mesa asignada</p>)
              }
            }
            )}
          </MDBCard>
        </MDBCol>
      </div>
    )
  }
}

