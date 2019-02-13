// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styles from './mensajeria.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse } from 'mdbreact';
import { Footer, NavbarInvitados, Mensaje, Invitado } from '@Components';
import { mensInv, Inv, postMens } from '@Models'

///////////// Component ////////////////
class MensajeriaInv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            titulo: '',
            mensaje: '',
            inv: {}
        }
        this.handleChange = this.handleChange.bind(this);
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentDidMount() {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.props.loadmens({ idb: invitado.id_boda })
        this.props.loadInv({ idb: invitado.id_boda })
        this.setState({
            inv: invitado
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value

        });

    }
    insertMensaje = () => () => {
        this.props.postMensa({
            id_invitado: this.state.inv.id,
            titulo: this.state.titulo,
            mensaje: this.state.mensaje,
        })
        this.props.loadmens({ idb: this.state.inv.id_boda });
        this.setState({
            titulo: '',
            mensaje: '',
            modal: !this.state.modal,
        })

    }
    render() {
        return (
            <div>
                <NavbarInvitados />
                <div className={styles.fondo}>
                    <h1 className={styles.rotulo}>Mensajeria</h1>
                    <MDBContainer>
                        <MDBBtn color="blue-grey" onClick={this.toggle}>Nuevo Mensaje</MDBBtn>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader className="blue-grey" toggle={this.toggle}> <input className="form-control" id="titulo" type="text" name="titulo" placeholder="Titulo mensaje" value={this.state.titulo} onChange={this.handleChange} /></MDBModalHeader>
                            <MDBModalBody className="blue-grey">
                                <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Que nos quieres decir!" value={this.state.mensaje} onChange={this.handleChange} />
                            </MDBModalBody>
                            <MDBModalFooter className="blue-grey">
                                <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                                <MDBBtn color=" teal darken-1" onClick={this.insertMensaje()}> Publicar </MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </MDBContainer>
                    <div className={styles.center}>
                        <div className="container">
                            <div className="row">
                                <div className={styles.center}>
                                    <div className="col l3">
                                        <h5>Mensajes novios</h5>
                                        {this.props.mensajes.map(m => {
                                            if (m.rol == 1) {
                                                return <Mensaje key={m.id_men} mensaje={{ ...m, familia: 'Novi@', parte: ' la Boda' }} />
                                            }
                                        })}
                                    </div>
                                    <div className="col l6">
                                        <h5>Mensajes Invitados</h5>
                                        {this.props.mensajes.map(m => {

                                            if (m.rol == 0) {
                                                return <Mensaje key={m.id_men} mensaje={m} />
                                            }
                                        })}
                                    </div>
                                    <div className="col l3">
                                        <h5>Invitados</h5>
                                        {this.props.invitados.map(m => {
                                            if (m.rol == 1) {
                                                return <Invitado key={m.id} invitado={{ ...m, familia: 'Novi@', parte: ' la Boda' }} />
                                            } else {
                                                return <Invitado key={m.id} invitado={m} />
                                            }
                                        })}
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

const mapStateToProps = (state, props) => {
    return {
        ...props,
        mensajes: state.rootReducer.mensajes,
        invitados: state.rootReducer.invitados
    };
}

const mapDispatchToProps = {
    loadmens: mensInv,
    loadInv: Inv,
    postMensa: postMens
}

export const ConnectMensajeriaInv = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaInv);

