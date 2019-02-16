// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './privado.css';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Footer, Navbar, ConnectMensajeriaResp, Invitado } from '@Components';
import { mensInv, Inv, postMens, mensPriv, borrarPriva } from '@Models'
import { style } from 'react-toastify';

///////////// Component ////////////////
class Priv extends Component {
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
        this.props.deleteMens({ id: this.props.priv.id});
    }
    render() {
        
        let privado=this.props.priv;
    
        return (
            <div className={styles.fondo}>
            
                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "22rem", marginBottom: "10px" }}>
                    <MDBCardBody>
                        <div className="row">
                            <button className={styles.button} onClick={this.toggle2}>
                                <b>x</b> </button>
                            <div className="col l12">
                                <p style={{ color: "white" }}>{this.props.inv.nombre} {this.props.inv.apellido} - ( {this.props.inv.familia} de {this.props.inv.parte} )</p>
                            </div></div>
                        < MDBCardText >
                            <p style={{ color: "white", fontSize: "20px" }}>{privado.mensaje}</p>
                        </MDBCardText>
                        <MDBBtn color="pink" href="#">Contestar</MDBBtn>
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
    loadPriv: mensPriv,
    deleteMens: borrarPriva
}

export const ConnectPriv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Priv);

