
// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import styles from './invitado.css';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer,MDBBtn,MDBModal,MDBModalHeader,MDBModalBody,MDBModalFooter } from "mdbreact";
import { avatar } from '../../assets';
///////////// Component ////////////////
export class Invitado extends Component {
state={
    modal:false,
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}


    componentDidMount() {

    }

    insertMen=()=>{
        this.toggle();
    }   

    enviarPriv=()=>{
      console.log('hola2')



      this.toggle()
  }
    
    
    render() {
                return (
                <MDBContainer>
                <MDBCard className="card-body #455a64 blue-grey darken-1" style={{ width: "100%", height: "5rem", marginBottom: "0.5rem" }}>
                    <div className="row"><div className="col l6">
                        <img src={avatar} className={styles.ima} /></div><div className="col l6"><h3 className={styles.nombre}>{this.props.invitado.nombre} {this.props.invitado.apellido}</h3><p className={styles.mensaje}>{this.props.invitado.familia} {this.props.invitado.parte}</p></div>
                    <MDBBtn style={{height:"40px"}} outline color="light" type='button' onClick={() => {
                        this.insertMen();
                        }
                        } value='Confirmar'>Mensaje Privado</MDBBtn>
                         <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                            <MDBModalHeader className="blue-grey" toggle={this.toggle}> <input className="form-control" id="titulo" type="text" name="titulo" placeholder="Titulo mensaje" value={this.state.titulo} onChange={this.handleChange} /></MDBModalHeader>
                            <MDBModalBody className="blue-grey">
                                <input className="form-control" id="mensaje" type="text" name="mensaje" placeholder="Que quieres decir!" value={this.state.mensaje} onChange={this.handleChange} />
                            </MDBModalBody>
                            <MDBModalFooter className="blue-grey">
                                <MDBBtn color=" red lighten-3" onClick={this.toggle}>Cerrar</MDBBtn>
                                <MDBBtn color=" teal darken-1"onClick={this.enviarPriv} > Enviar </MDBBtn>
                            </MDBModalFooter>
                        </MDBModal>
                    </div>
                </MDBCard>
            </MDBContainer>

        );
    }
}