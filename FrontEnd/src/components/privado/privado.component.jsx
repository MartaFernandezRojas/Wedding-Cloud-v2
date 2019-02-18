// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './privado.css';
// import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdbreact';
import { Footer, Navbar, ConnectMensajeriaResp, Invitado } from '@Components';
import { mensInv, Inv, postMens, mensPriv, borrarPriva, postRespPriv, getRespPriv } from '@Models'
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
        this.props.getRespPriv({ id_mensajePriv: this.props.priv.id });
    }
    componentDidUpdate() {
        // var invitado = JSON.parse(localStorage.getItem("invitado"));
        // this.props.loadPriv({ id_invReceptor: invitado.id })
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
            id_mensajePriv: this.props.priv.id,
            id_invitado: this.props.inv.id,
        }

        this.props.postRespPriv(mensaje)
        this.props.getRespPriv({ id_mensajePriv: mensaje.id_mensajePriv });

        // axios.post('http://localhost:3000/mensajes/mesajePriv', mensaje)
        //     .then(response => {
        //     })
        // this.props.deleteMens({ id: this.props.priv.id });

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

                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "18rem", marginBottom: "10px" }}>
                    <MDBCardBody>
                        {/* <button className={styles.button} style={{fontSize:"15px"}} onClick={this.toggle2}>
                        <b>x</b> </button> */}
                        <div className="row">
                            <div className="col l6">
                                <p style={{ color: "white", fontSize: "15px" }}>{this.props.inv.nombre} {this.props.inv.apellido} -  {this.props.inv.familia} de {this.props.inv.parte} </p>
                            </div></div>
                        < MDBCardText >
                            <ul>
                                <li className="list-group-item list-group-item-info">{this.props.inv.nombre}: {privado.mensaje}</li>

                                {this.props.respuestasPriv[privado.id]?this.props.respuestasPriv[privado.id].map(m =>
                                    <li className="list-group-item list-group-item-info">{m.mensaje}</li>
                                ):null
                                }
                            </ul>

                        </MDBCardText>
                        <MDBBtn color="blue-grey" onClick={this.toggle} size="sm">Contestar</MDBBtn>
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
        respuestasPriv: state.rootReducer.respuestasPriv
    };
}

const mapDispatchToProps = {
    loadInv: Inv,
    loadPriv: mensPriv,
    deleteMens: borrarPriva,
    postRespPriv: postRespPriv,
    getRespPriv: getRespPriv
}

export const ConnectPriv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Priv);

