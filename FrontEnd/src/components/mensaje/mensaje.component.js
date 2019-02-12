// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import styles from './mensaje.css';
import { avatar } from '../../assets';

import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
///////////// Component ////////////////
export class Mensaje extends Component {

    render() {
        return (
            <MDBContainer>
                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "20rem", marginTop: "1rem" }}>
                    <div className={styles.fondo}>
                        <div className="row"><div className="col l6">
                            <img src={avatar} className={styles.img} /></div><div className="col l6"><h3 className={styles.titulo}>{this.props.mensaje.nombre} {this.props.mensaje.apellido}</h3><p className={styles.mensaje}>{this.props.mensaje.familia} de {this.props.mensaje.parte}</p></div>
                        </div>
                        <MDBCardTitle><h3 className={styles.titulo}>{this.props.mensaje.titulo} </h3></MDBCardTitle>
                        <MDBCardText>
                            <p className={styles.mensaje}>{this.props.mensaje.mensaje}</p>
                        </MDBCardText>
                        <div className="flex-row">
                            <a href="#!"><i className="material-icons">
                                thumb_up_alt
                            </i></a>
                            <a href="#!" style={{ marginLeft: "1.25rem" }}>Responder</a>
                        </div>
                    </div>
                </MDBCard>
            </MDBContainer>

        );
    }
}

