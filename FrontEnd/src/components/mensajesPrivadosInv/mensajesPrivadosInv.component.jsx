// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './mensajesPrivadosInv.css';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Footer, Navbar, ConnectMensajeriaResp, Invitado,ConnectPriv } from '@Components';
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
                                                    return (<ConnectPriv key={i.id} priv={i} inv={b}/>)
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
