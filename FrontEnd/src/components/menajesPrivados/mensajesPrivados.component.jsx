// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse } from 'mdbreact';
import { Footer, NavbarInvitados, ConnectMensajeriaResp, Invitado } from '@Components';
import { mensInv, Inv, postMens } from '@Models'

///////////// Component ////////////////
class MensajeriaInv extends Component {
   
    render() {
        return (
          <p>Hola</p>

        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        invitados: state.rootReducer.invitados
    };
}

const mapDispatchToProps = {
    loadInv: Inv,
    
}

export const ConnectMensajeriaInv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaInv);

