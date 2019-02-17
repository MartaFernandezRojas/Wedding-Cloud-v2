// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from './mensaje.css';
import { connect } from 'react-redux';
import { avatar } from '../../assets';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCardTitle, MDBCardText, MDBCard, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import { postResp, getResp, deleteMensaje } from '@Models'
///////////// Component ////////////////
class MensajeResp extends Component {
    state = {
        collapseID: "",
        modal2: false,
        mensaje: '',
        rol: null,
        id: null,
        modal3: false
    }
    componentDidMount() {
        this.props.loadResp({ id_mensaje: this.props.mensaje.id_men });
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.state.rol = invitado.rol;
        this.state.id = invitado.id
    }
    toggle = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }
    toggle2 = () => {
        this.setState({
            modal3: !this.state.modal3
        });
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    responder = () => {
        this.props.insertResp({
            id_mensaje: this.props.mensaje.id_men,
            id_invitado: this.props.inv,
            mensaje: this.state.mensaje,
        });
        this.toggle();
        this.props.loadResp({ id_mensaje: this.props.mensaje.id_men });
    }
    eliminar = () => {
        this.props.delete({ id_mensaje: this.props.mensaje.id_men });
    }

    componentDidUpdate() {
        return true;
    }
    render() {
        const idM = this.props.mensaje.id_men;
        return (

            <MDBContainer>
                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "100%", marginTop: "1rem" }}>
                    <div className={styles.fondo}>
                        <div className="row">
                            <div className="col l3">
                                <img src={avatar} className={styles.img} />
                            </div>
                            <div className="col l12"><h3 style={{ fontSize: "15px", marginLeft: "-20px" }}>{this.props.mensaje.nombre} {this.props.mensaje.apellido}</h3><p style={{ fontSize: "10px", marginLeft: "-20px" }} className={styles.mensaje}>{this.props.mensaje.familia} de {this.props.mensaje.parte}</p>
                            </div>
                           
                            {this.state.rol == 1 || this.state.id == this.props.mensaje.id_inv ?
                                <div>
                                    <button className={styles.button} onClick={this.toggle2}>
                                        <b>x</b>
                                    </button>
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
                                </div>
                                : null}
                        </div>
                        <MDBCardTitle><h5 className={styles.titulo} style={{ fontSize: "15px", marginTop: "-40px" }}>{this.props.mensaje.titulo} </h5></MDBCardTitle>
                        <MDBCardText>
                            <p style={{ fontSize: "13px", color: "white" }}>{this.props.mensaje.mensaje}</p>
                        </MDBCardText>
                        <div className="row">

                            <div className="col l6">
                                <MDBBtn color="blue-grey" style={{ fontSize: "8px" }} size="sm" onClick={this.toggle}>Responder</MDBBtn>
                                <MDBModal isOpen={this.state.modal2} toggle={this.toggle}>
                                    <MDBModalBody className="blue-grey">
                                        <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Responde al mensaje!" value={this.state.mensaje} onChange={this.handleChange} />
                                    </MDBModalBody>
                                    <MDBModalFooter className="blue-grey">
                                        <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                                        <MDBBtn color=" teal darken-1" onClick={this.responder}> Publicar </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </div>

                            <div className="col l6">
                                <MDBBtn className={styles.botones} style={{ fontSize: "8px" }} size="sm" color="blue-grey" onClick={this.toggleCollapse("basicCollapse")}>
                                    Respuestas
                                </MDBBtn>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col l12">
                                <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                                    <MDBListGroup   className="list-group-item list-group-item-info" style={{ width: "100%" }}>
                                        {this.props.respuestas[idM] && this.props.respuestas[idM].length ?
                                            this.props.respuestas[idM].map(m =>
                                                <MDBListGroupItem style={{ fontSize: "13px" }} size="sm" className="list-group-item list-group-item-info">{m.mensaje}<p className={styles.tipado} style={{ fontSize: "10px" }}> mensaje de: {m.nombre} {m.apellido} {moment(m.fecha).startOf('minutes').fromNow()}</p></MDBListGroupItem>
                                            ) : null
                                        }
                                    </MDBListGroup>
                                </MDBCollapse>
                            </div>

                        </div>
                    </div>
                </MDBCard>

            </MDBContainer >
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        ...props,
        mensajes: state.rootReducer.mensajes,
        invitados: state.rootReducer.invitados,
        respuestas: state.rootReducer.respuestas
    };
}

const mapDispatchToProps = {
    insertResp: postResp,
    loadResp: getResp,
    delete: deleteMensaje,

}

export const ConnectMensajeriaResp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeResp);
