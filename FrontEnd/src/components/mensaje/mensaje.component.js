// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import styles from './mensaje.css';
import { connect } from 'react-redux';
import { avatar } from '../../assets';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCardTitle, MDBCardText, MDBCard, MDBListGroup, MDBListGroupItem } from 'mdbreact';
import { postResp, getResp } from '@Models'
///////////// Component ////////////////
class MensajeResp extends Component {
    state = {
        collapseID: "",
        modal2: false,
        mensaje: '',
    }
    componentDidMount() {
        this.props.loadResp({ id_mensaje: this.props.mensaje.id_men });
    }
    toggle = () => {
        this.setState({
            modal2: !this.state.modal2
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

    render() {
        const idM = this.props.mensaje.id_men;
        return (
            <MDBContainer>
                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "28rem", marginTop: "1rem" }}>
                    <div className={styles.fondo}>
                        <div className="row">
                            <div className="col l6">
                                <img src={avatar} className={styles.img} />
                            </div>
                            <div className="col l6"><h3 className={styles.titulo}>{this.props.mensaje.nombre} {this.props.mensaje.apellido}</h3><p className={styles.mensaje}>{this.props.mensaje.familia} de {this.props.mensaje.parte}</p>
                            </div>
                        </div>
                        <MDBCardTitle><h3 className={styles.titulo}>{this.props.mensaje.titulo} </h3></MDBCardTitle>
                        <MDBCardText>
                            <p className={styles.mensaje}>{this.props.mensaje.mensaje}</p>
                        </MDBCardText>
                        <div className="row">
                            <MDBContainer>
                                <MDBBtn color="blue-grey" onClick={this.toggle}>Responder</MDBBtn>
                                <MDBModal isOpen={this.state.modal2} toggle={this.toggle}>
                                    <MDBModalBody className="blue-grey">
                                        <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Responde al mensaje!" value={this.state.mensaje} onChange={this.handleChange} />
                                    </MDBModalBody>
                                    <MDBModalFooter className="blue-grey">
                                        <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                                        <MDBBtn color=" teal darken-1" onClick={this.responder}> Publicar </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </MDBContainer>
                            <div className="col l4">
                                <MDBBtn color="blue-grey" onClick={this.toggleCollapse("basicCollapse")}>
                                    RESPUESTAS
                                </MDBBtn>
                            </div>
                            <MDBCollapse className={styles.respuestas} id="basicCollapse" isOpen={this.state.collapseID}>
                                <MDBListGroup style={{ width: "25rem" }}>
                                    {this.props.respuestas[idM] && this.props.respuestas[idM].length ?
                                        this.props.respuestas[idM].map(m =>
                                            <MDBListGroupItem>{m.mensaje}<p className={styles.tipado}> mensaje de: {m.nombre} {m.apellido} {moment(m.fecha).startOf('minutes').fromNow()}</p></MDBListGroupItem>
                                        ):null
                                    }
                                        }
                                </MDBListGroup>
                            </MDBCollapse>
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
    loadResp: getResp
}

export const ConnectMensajeriaResp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeResp);
