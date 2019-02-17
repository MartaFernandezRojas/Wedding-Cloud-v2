// Import libraries
import React, { Component } from 'react';
import axios from 'axios';

import { FormularioConfirmacion } from '../formConfirmacion';
import styles from './logOut.css';
import { Switch, Redirect, BrowserRouter, } from 'react-router-dom';
import stylesform from './logOut.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
///////////// Component ////////////////
export class LogOut extends Component {

    state = {
        redirect: false
    };
    logOut() {

        axios.get('http://localhost:3000/log/logOut')
        .then(response => {
            console.log(response)
            if(response.statusText =='OK'){
                localStorage.clear();
                  this.setState({ redirect: true });
            }

        })
    }

    render() {

        const redireccion = this.state.redirect ? <Redirect to="/" /> : null

        return (
            <div className={styles.background}>
                <h5 className={styles.salir} style={{fontSize:"15px",color:"grey"}}>¿Deseas salir de la plataforma?</h5>
                <form >
                <MDBBtn outline color="grey" onClick={() => {
                        this.logOut();
                    }
                    } className={styles.button} size="sm" value='Salir'>Salir</MDBBtn>

                </form>
                {redireccion}
            </div>
        );
    }
}
