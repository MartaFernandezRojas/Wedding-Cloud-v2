// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import styles from './mensaje.css';
import { connect } from 'react-redux';
import { avatar } from '../../assets';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCollapse, MDBCardTitle, MDBCardText, MDBCard } from 'mdbreact';
import { postResp } from '@Models'
///////////// Component ////////////////
class MensajeResp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseID: "",
            modal2: false
        }
        this.handleChange = this.handleChange.bind(this);
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
    resp(){
        console.log('Hola');
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    contador() {
        console.log('Hola');
    }
    render() {
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
                            <div className="col l4">
                                <a onClick={this.contador} href="#!"><i className="material-icons">
                                    thumb_up_alt
                                    </i></a>
                            </div>
                            <MDBContainer>
                                <MDBBtn color="blue-grey" onClick={this.toggle}>Responder</MDBBtn>
                                <MDBModal isOpen={this.state.modal2} toggle={this.toggle}>

                                    <MDBModalBody className="blue-grey">
                                        <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Responde al mensaje!" value={this.state.mensaje} onChange={this.handleChange} />
                                    </MDBModalBody>
                                    <MDBModalFooter className="blue-grey">
                                        <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                                        <MDBBtn color=" teal darken-1" onClick={() => {
                                            this.toggle()
                                        }}> Publicar </MDBBtn>
                                    </MDBModalFooter>
                                </MDBModal>
                            </MDBContainer>

                            <div className="col l4">
                                <MDBBtn color="blue-grey" onClick={()=>{this.toggleCollapse("basicCollapse"), this.resp()}}>
                                    RESPUESTAS
                                </MDBBtn>
                            </div>
                            <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                                <p>
                                    Anim pariatur cliche reprehenderit, enim eiusmod high life
                                    accusamus terry richardson ad squid. Nihil anim keffiyeh
                                    helvetica, craft beer labore wes anderson cred nesciunt sapiente
                                    ea proident.
                                    </p>
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
    loadresp: postResp,
}

export const ConnectMensajeriaResp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MensajeResp);
