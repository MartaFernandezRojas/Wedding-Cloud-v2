
// Import libraries
import React, { Component } from 'react';
import styles from './invitado.css';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import { avatar } from '../../assets';
///////////// Component ////////////////
export class Invitado extends Component {

    render() {
        return (
            <MDBContainer>
                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "14rem", height:"5rem", marginBottom:"0.5rem"}}>
                        <div className="row"><div className="col l6">
                            <img src={avatar} className={styles.ima} /></div><div className="col l6"><h3 className={styles.nombre}>{this.props.invitado.nombre} {this.props.invitado.apellido}</h3><p className={styles.mensaje}>{this.props.invitado.familia} {this.props.invitado.parte}</p></div>
                        </div>
                </MDBCard>
            </MDBContainer>

        );
    }
}