// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Footer, Navbar, ConnectMensajeriaResp, Invitado } from '@Components';
import { mensInv, Inv, postMens, mensPriv } from '@Models'

///////////// Component ////////////////
class MensajeriaPriv extends Component {
    state = {
        inv: []
    }

    componentDidMount() {
        var invitado = JSON.parse(localStorage.getItem("invitado"));

        this.props.loadInv({ idb: invitado.id_boda })
        // this.setState({
        //     inv: invitado

        // })
        console.log(this.state.inv)
        this.props.loadPriv({ id_invReceptor: invitado.id })
    }
    componentDidUpdate() {
        return true;
    }

    render() {
        return (
            <div>
                <Navbar />
                <h4>Mensajes privados</h4>
                <div className="container-fluid">
                    <div className="row">

                        {this.props.privados.map(m => {
                            return (
                                m.map(i => {
                                    return (
                                        <div className="col l3">
                                            {this.props.invitados.map(b => {
                                                console.log(i.id_invitado)
                                                if (b.id == i.id_invitado) {
                                                return (<MDBCard style={{ width: "22rem" }}>
                                                    <MDBCardBody>
                                                        <p>Mensaje de {b.nombre} {b.apellido} - ( {b.familia} de {b.parte} )</p>
                                                        < MDBCardText >
                                                          {i.mensaje}
                                                        </MDBCardText>
                                                        <MDBBtn href="#">Contestar</MDBBtn>
                                                    </MDBCardBody>
                                                </MDBCard>)
                                                }
                                            })}

                                        </div>
                                    )
                                })
                            )
                        })}

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

