// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse,MDBCard,MDBCardBody,MDBCardTitle,MDBCardText } from 'mdbreact';
import { Footer, Navbar, ConnectMensajeriaResp, Invitado } from '@Components';
import { mensInv, Inv, postMens, mensPriv } from '@Models'

///////////// Component ////////////////
class MensajeriaPriv extends Component {

    componentDidMount() {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.props.loadPriv({ id_invReceptor: invitado.id })
    }

    render() {
        return (
            <div>
                <Navbar />
                <h4>Mensajes privados</h4>
                <div className="container">
                    <div className="row">
                        <div className="col l4">
                            {this.props.privados.map(m => {
                                return (
                                    m.map(i => {
                                        return (
                                        <MDBCard style={{ width: "22rem" }}>
                                        <MDBCardBody>
                                          <MDBCardTitle>Card title</MDBCardTitle>
                                          <MDBCardText>
                                          {i.mensaje}
                                          </MDBCardText>
                                          <MDBBtn href="#">MDBBtn</MDBBtn>
                                        </MDBCardBody>
                                      </MDBCard>)

                                    })
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        invitados: state.rootReducer.invitados,
        privados: state.rootReducer.privados,
    };
}

const mapDispatchToProps = {
    loadInv: Inv,
    loadPriv: mensPriv
}

export const ConnectMensajeriaPriv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaPriv);

