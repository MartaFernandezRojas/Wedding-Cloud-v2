// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './mensajesPrivados.css';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Footer, ConnectNavbar, ConnectMensajeriaResp, Invitado, ConnectPriv } from '@Components';
import { mensInv, Inv, postMens, mensPriv, borrarPriva, postRespPriv, mensPriv2 } from '@Models'
import { style } from 'react-toastify';

///////////// Component ////////////////
class MensajeriaPriv extends Component {
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

        this.props.loadPriv({ id_invReceptor: invitado.id })
        this.props.loadPriv2({ id_invitado: invitado.id })
    }
    componentDidUpdate() {
        return true;
    }
    toggle2 = () => {
        this.setState({
            modal3: !this.state.modal3
        });
    }
    eliminar = () => {

        // this.props.deleteMens({ id: this.props.id});
    }


    render() {
        // console.log(this.props.privados.length)
        return (
            <div className={styles.fondo}>
                <ConnectNavbar props={this.props.privados.length} />
                {/* <h4>Mensajes privados</h4> */}
                <div className="container" style={{ marginTop: "30px" }}>
                    <div className="row">
                       
                            {this.props.privados.map(m => {
                                return (
                                    <div className="col l3">
                                        {this.props.invitados.map(b => {
                                            if (b.id == m.id_invitado) {
                                                return (
                                                    <ConnectPriv key={m.id} priv={m} inv={b} />
                                                )
                                            }
                                        })}
                                    </div>
                                )

                            })}
                    
                        {this.props.privados2[0] ? this.props.privados2[0].map(m => {
                            return (
                                <div className="col l3">
                                    {this.props.invitados.map(b => {
                                        if (b.id == m.id_invitado) {
                                            return (
                                                <ConnectPriv key={m.id} priv={m} inv={b} />
                                            )
                                        }
                                    })}

                                </div>
                            )
                        }) : null}
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
        privados2: state.rootReducer.privados2,
    };
}

const mapDispatchToProps = {
    loadInv: Inv,
    loadPriv: mensPriv,
    loadPriv2: mensPriv2
}

export const ConnectMensajeriaPriv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaPriv);

