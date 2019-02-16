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
    constructor(props) {
        super(props);
        this.state = {
            inv: [],
            modal3: false,
            modal: false,
            mensaje: '',
        }
        this.handleChange = this.handleChange.bind(this);
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
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    eliminar = () => {
        this.props.deleteMens({ id: this.props.priv.id });
    }
    insertMensaje = () => {

        var invitado = JSON.parse(localStorage.getItem("invitado"));

        let mensaje = {
            mensaje: this.state.mensaje,
            id_invReceptor: this.props.inv.id,
            id_invitado: invitado.id
        }
        console.log(mensaje);

        axios.post('http://localhost:3000/mensajes/mesajePriv', mensaje)
            .then(response => {
                console.log(response.data)
            })
            this.props.loadPriv({ id_invReceptor: invitado.id })
            this.setState({
                modal: !this.state.modal
            });
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {

        let privado = this.props.priv;

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
                        <MDBBtn color="pink" onClick={this.toggle} href="#">Contestar</MDBBtn>
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
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalBody className="blue-grey">
                        <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Que quieres contestar?" value={this.state.mensaje} onChange={this.handleChange} />
                    </MDBModalBody>
                    <MDBModalFooter className="blue-grey">
                        <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                        <MDBBtn color=" teal darken-1" onClick={this.insertMensaje}> Contestar </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
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

