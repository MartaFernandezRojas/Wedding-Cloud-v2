// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './mensajeriaAdmin.css';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse } from 'mdbreact';
import { Footer, ConnectNavbar, ConnectMensajeriaResp, Invitado, ConnectINV } from '@Components';
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
            idb: this.state.inv.id_boda
        })
       
        this.setState({
            titulo: '',
            mensaje: '',
            modal: !this.state.modal,
        })

    }
    render() {
        const redirect = this.state.inv.rol==0?<Redirect from="/gestionInvitados" to="/FormularioConfirmacion"/>:null
        return (
            <div>
                <ConnectNavbar />
                <div className={styles.fondo}>
                    {/* <h1 className={styles.rotulo}>Mensajeria</h1> */}
                    <MDBContainer>
                        <MDBBtn color="blue-grey" style={{ marginTop: "30px", fontSize: "10px" }} onClick={this.toggle}>Nuevo Mensaje</MDBBtn>
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
                                <div className="col l4 s12">
                                    <h5 style={{ fontSize: "15px" }}>Mensajes novios</h5>
                                    {this.props.mensajes?this.props.mensajes.slice(0).reverse().map(m => {
                                        if (m.rol == 1) {
                                            return <ConnectMensajeriaResp key={m.id_men} inv={this.state.inv.id} mensaje={{ ...m, familia: 'Novi@', parte: ' la Boda' }} />
                                        }
                                    }):null}
                                </div>
                                <div className="col l4 s12">
                                    <h5 style={{ fontSize: "15px" }}>Mensajes Invitados</h5>
                                    {this.props.mensajes?this.props.mensajes.slice(0).reverse().map(m => {
                                        if (m.rol == 0) {
                                            return <ConnectMensajeriaResp key={m.id_men} inv={this.state.inv.id} mensaje={m} />
                                        }
                                    }):null}
                                </div>
                                <div className="col l4 s12">
                                <h5 style={{ fontSize: "15px" }}>Invitados</h5>
                                    <div className={styles.emojis}>
                                        {this.props.invitados.map(m => {
                                            if (m.id != this.state.inv.id) {
                                                if (m.rol == 1) {
                                                    return <ConnectINV key={m.id} invitado={{ ...m, familia: 'Novi@', parte: ' la Boda' }} panelAdmin={true} />
                                                } else {
                                                    return <ConnectINV key={m.id} invitado={m} panelAdmin={true}/>
                                                }
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {redirect}
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

export const ConnectMensajeriaInv2 = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeriaInv);

