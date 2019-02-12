// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import styles from './mensajeria.css';
import { Footer, NavbarInvitados, Mensaje, Invitado } from '@Components';
import {mensInv} from '@Models'

///////////// Component ////////////////
 class MensajeriaInv extends Component {

    componentDidMount() {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
       this.props.loadmens({idb: invitado.id_boda})
        
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
                                    </div>
                                    <div className="col l6">
                                        <h5>Mensajes Invitados</h5>
                                        {this.props.mensajes.map(m=>{
                                          return <Mensaje key={m.id_men} mensaje={m}/>
                                      })}
                                    </div>
                                    <div className="col l3">
                                        <h5>Invitados</h5>
                                        
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

const mapStateToProps=(state,props)=>{
    return{
        ...props,
        mensajes:state.rootReducer.mensajes,
    };
}

const mapDispatchToProps={

    loadmens: mensInv,
}

export const ConnectMensajeriaInv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaInv);