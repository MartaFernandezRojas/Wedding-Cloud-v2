
// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import styles from './invitado.css';
import { MDBCard, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalFooter } from "mdbreact";
import { avatar } from '../../assets';
import { connect } from 'react-redux';
import { postResp, getResp, deleteInv } from '@Models'


///////////// Component ////////////////
class Invitado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            modal2: false,
            mensaje: '',
            id_invitado: null,
            id_receptor: null,
            inv:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }

    insertMen = () => {
        this.toggle();
    }
    
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });

    }
    eliminarUsu=()=>{

        this.props.deleteIn({ id: this.props.invitado.id});

        this.setState({
            modal2: !this.state.modal2
        });
    }
    componentDidMount(){
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.setState({inv:invitado})
        console.log(this.state.inv);
    }
    enviarPriv = () => {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        
        let mensaje = {
            mensaje: this.state.mensaje,
            id_invReceptor: this.props.invitado.id,
            id_invitado: invitado.id
        }

        axios.post('http://localhost:3000/mensajes/mesajePriv', mensaje)
            .then(response => {
                console.log(response.data)
            })
        this.toggle()
    }
    render() {
        return (
            <MDBContainer>
                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "80%", margin:'auto', marginBottom:'10px' }}>
                    <div className="row"><div className="col l6">
                        <img src={`http://localhost:3000/${this.props.invitado.url}`} className={styles.ima} /></div><div className="col l6"><h3 className={styles.nombre}>{this.props.invitado.nombre} {this.props.invitado.apellido}</h3><p className={styles.mensaje}>{this.props.invitado.familia} {this.props.invitado.parte}</p></div>
                        {this.state.inv.rol == 1?
                                <div>
                                    <a onClick={this.toggle2}>
                                        <b style={{color:"white"}}>X</b>
                                    </a>
                                    <MDBContainer>
                                        <MDBModal isOpen={this.state.modal2} toggle={this.toggle2}>
                                            <MDBModalBody>
                                                ¿Estas seguro que quieres borrar el mensaje?
                                        </MDBModalBody>
                                            <MDBModalFooter>
                                                <MDBBtn color="secondary" onClick={this.toggle2}>Cerrar</MDBBtn>
                                                <MDBBtn color="primary" onClick={this.eliminarUsu}>Borrar</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>
                                    </MDBContainer>
                                </div>
                                : null}
                        <MDBBtn style={{ fontSize: "8px" }} size="sm" color="blue-grey" type='button' onClick={() => {
                            this.insertMen();
                        }
                        } value='Confirmar'>Mensaje</MDBBtn>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalBody className="blue-grey">
                                <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Que quieres decir!" value={this.state.mensaje} onChange={this.handleChange} />
                            </MDBModalBody>
                            <MDBModalFooter className="blue-grey">
                                <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                                <MDBBtn color=" teal darken-1" onClick={this.enviarPriv} > Enviar </MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </div>
                </MDBCard>
            </MDBContainer>

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
    deleteIn: deleteInv,

}

export const ConnectINV = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Invitado);
