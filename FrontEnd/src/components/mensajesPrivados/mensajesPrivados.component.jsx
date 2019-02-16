// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse } from 'mdbreact';
import { Footer, NavbarInvitados, ConnectMensajeriaResp, Invitado } from '@Components';
import { mensInv, Inv, postMens } from '@Models'

///////////// Component ////////////////
class MensajeriaInv extends Component {
   
    componentDidMount() {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.props.loadPriv({ id_invReceptor: invitado.id })
      
    }

    render() {
        return (
          <p>{this.props.privados.map(m => {
                return (m.mensaje)
        })}</p>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        invitados: state.rootReducer.invitados,
        privados:state.rootReducer.privados,
    };
}

const mapDispatchToProps = {
    loadInv: Inv,
    loadPriv:mensPriv
}

export const ConnectMensajeriaPriv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaPriv);

