// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './mensajesPrivadosInv.css';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Footer, Navbar, ConnectMensajeriaResp, Invitado } from '@Components';
import { mensInv, Inv, postMens, mensPriv } from '@Models'
import { NavbarInvitados } from '../navbarInvitados';

///////////// Component ////////////////
class MensajeriaPrivInv extends Component {
    state = {
        inv: [],
        modal3: false
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
    toggle2 = () => {
        this.setState({
            modal3: !this.state.modal3
        });
    }
    eliminar() {

    }
    render() {
        return (
            <div>
                <NavbarInvitados />
                <h4>Mensajes privados</h4>
                <div className="container-fluid">
                    <div className="row">
                        {this.props.privados.map(m => {
                            return (
                                m.map(i => {
                                    return (
                                        <div className="col l3">
                                            {this.props.invitados.map(b => {
                                                if (b.id == i.id_invitado) {
                                                    return (<MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "22rem", marginBottom: "10px" }}>
                                                        <MDBCardBody>
                                                            <div className="row">
                                                            <button className={styles.button} onClick={this.toggle2}>
                                                                        <b>x</b> </button>
                                                                <div className="col l12">
                                                                    <p style={{ color: "white" }}>{b.nombre} {b.apellido} - ( {b.familia} de {b.parte} )</p>
                                                                    
                                                                </div></div>
                                                            < MDBCardText >
                                                                <p style={{ color: "white", fontSize: "20px" }}>{i.mensaje}</p>
                                                            </MDBCardText>
                                                            <MDBBtn href="#">Contestar</MDBBtn>
                                                        </MDBCardBody>
                                                        <MDBContainer>
                                                            <MDBModal isOpen={this.state.modal3} toggle={this.toggle2}>
                                                                <MDBModalBody>
                                                                    ¿Estas seguro que quieres borrar el mensaje?
                                                                </MDBModalBody>
                                                                <MDBModalFooter>
                                                                    <MDBBtn color="secondary" onClick={this.toggle2}>Cerrar</MDBBtn>
                                                                    <MDBBtn color="primary" onClick={this.eliminar}>Borrar</MDBBtn>
                                                                </MDBModalFooter>
                                                            </MDBModal>
                                                        </MDBContainer>
                                                    </MDBCard>
                                                    )
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

export const ConnectMensajeriaPrivInv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaPrivInv);

