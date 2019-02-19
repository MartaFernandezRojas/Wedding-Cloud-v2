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
        console.log(invitado)
        this.setState({
            inv: invitado
        })
        this.props.loadInv({ idb: invitado.id_boda })

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
            id_invitado: invitado.id,
        }
        this.props.postRespPriv(mensaje);

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

            <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "20rem", marginBottom: "10px" }}>
                <MDBCardBody>
                    {/* <button className={styles.button} style={{fontSize:"15px"}} onClick={this.toggle2}>
                        <b>x</b> </button> */}
                    <div className="row">
                    <img src={`http://localhost:3000/${this.props.inv.url}`} className={styles.img} />
                        <div className="col l6">
                        
                            <p style={{ color: "white", fontSize: "15px" }}><p style={{ fontSize: "15px", color: "white" }}> Inicio el hilo: </p> {this.props.inv.nombre} {this.props.inv.apellido} </p>
                        </div></div>
                    < MDBCardText >
                        <div className={styles.emojis}>
                            <ul>
                                <li className="list-group-item list-group-item-info" style={{ marginRight: "15px", borderRadius: " 5px 5px 5px 5px", marginBottom: "3px" }}>{this.props.inv.nombre}: {privado.mensaje}</li>
                                {this.props.respuestasPriv[privado.id] ? this.props.respuestasPriv[privado.id].map(m =>

                                    this.props.inv.nombre == m.nombre ?

                                        <li className="list-group-item list-group-item-info" style={{ marginRight: "15px", borderRadius: " 5px 5px 5px 5px", marginBottom: "3px" }}>{m.nombre}: {m.mensaje}</li>
                                        :
                                        <li className="list-group-item list-group-item-danger" style={{ marginLeft: "15px", borderRadius: " 5px 5px 5px 5px", marginBottom: "3px" }}>{m.nombre}: {m.mensaje}</li>

                                ) : null
                                }
                            </ul>
                        </div>
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
                <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <MDBModalBody className="blue-grey">
                        <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Que quieres contestar?" value={this.state.mensaje} onChange={this.handleChange} />
                    </MDBModalBody>
                    <MDBModalFooter className="blue-grey">
                        <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                        <MDBBtn color=" teal darken-1" onClick={this.insertMensaje}> Contestar </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBCard>
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

