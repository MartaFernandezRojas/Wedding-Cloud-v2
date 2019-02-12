// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './mensajeria.css';
import { Footer, NavbarInvitados, Mensaje, Invitado } from '@Components';
import { mensInv, Inv } from '@Models'

///////////// Component ////////////////
class MensajeriaInv extends Component {

    componentDidMount() {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.props.loadmens({ idb: invitado.id_boda })
        this.props.loadInv({ idb: invitado.id_boda })
    }

    render() {
        return (
            <div>
                <NavbarInvitados />
                <div className={styles.fondo}>
                    <h1 className={styles.rotulo}>Mensajeria</h1>
                    <div className={styles.center}>
                        <div className="container">
                            <div className="row">
                                <div className={styles.center}>
                                    <div className="col l3">
                                        <h5>Mensajes novios</h5>
                                        {this.props.mensajes.map(m => {
                                            if (m.rol == 1) {
                                                return <Mensaje key={m.id_men} mensaje={{...m, familia:'Novi@', parte:' la Boda'}} />
                                            }
                                        })}
                                    </div>
                                    <div className="col l6">
                                        <h5>Mensajes Invitados</h5>
                                        {this.props.mensajes.map(m => {

                                            if (m.rol == 0) {
                                                return <Mensaje key={m.id_men} mensaje={m} />
                                            }
                                        })}
                                    </div>
                                    <div className="col l3">
                                        <h5>Invitados</h5>
                                        {this.props.invitados.map(m => {
                                            return <Invitado key={m.id} invitado={m} />
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        mensajes: state.rootReducer.mensajes,
        invitados: state.rootReducer.invitados
    };
}

const mapDispatchToProps = {
    loadmens: mensInv,
    loadInv: Inv
}

export const ConnectMensajeriaInv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaInv);

