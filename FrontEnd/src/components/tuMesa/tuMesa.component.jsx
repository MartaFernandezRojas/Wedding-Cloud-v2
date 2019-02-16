import React, { Component } from 'react';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBFileInput } from 'mdbreact';



export class TuMesa extends Component {
  state = {
    invitados: {}
  }


  componentDidMount() {
   
  }


  render() {
    let invitado = this.props;
    console.log(invitado.props.id_boda)
    function cargarInvitado(){
      axios.get('http://localhost:3000/invitados/invitadoMesa', { params: { idb: invitado.props.id_boda, m: invitado.props.mesa } })
      .then(response => {
        
        this.setState({ invitados: response.data })
      })
     
    }
    
    return (
      <p>{invitado.props.id_boda} {cargarInvitado()}</p>
    )
  }
}

