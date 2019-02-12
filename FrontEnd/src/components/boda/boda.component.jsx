import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Redirect, BrowserRouter, } from 'react-router-dom';
import { ResultadoInvitado } from '../resultadoInvitado/resultadoInvitado.component'
import styles from '../../routes/router/router.styles.css';
import stylesform from './boda.css';
import { style } from 'react-toastify';
// Import global resources

// Import local resources
// import styles from './galeria.styles.css';

//import componenet react-materialize
// import {Button} from 'react-materialize';

///////////// Component ////////////////
export class Boda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_boda: null,
            nombre: '',
            apellido: '',
            email: '',
            password: '',
            rol: 0,
            mesa:0,
            redirect: false,
            redirect2: false,
            novio1: '',
            novio2: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    crear() {
        let boda = {
            novio1: this.state.nombre,
            novio2: this.state.novio2
        }
        axios.post('http://localhost:3000/boda', boda)
            .then(response => {
                let user = {
                    id_boda: response.data.id,
                    nombre: this.state.nombre,
                    apellido: this.state.apellido,
                    email: this.state.email,
                    password: this.state.password,
                    rol: 1
                }
                axios.post('http://localhost:3000/invitados/post', user)
                    .then(response => {
                        if (response.data.mesa == 0) {
                            let userLogIn = {
                                email: this.state.email,
                                password: this.state.password
                            }
                            axios.post('http://localhost:3000/log/logIn', userLogIn)
                                .then(response => {
                                    localStorage.setItem('invitado', JSON.stringify(response.data));
                                    this.setState({ redirect: true })
                                });
                        } else {
                            console.log('Error');
                        }
                    });
            });
    }


    render() {
        const redireccion = this.state.redirect ? <Redirect from="/" to="/FormularioConfirmacionAdmin" /> : null
        return (
            <div className={stylesform.boda}>
                <h5>Crea tu boda</h5>
                <form >
                    <input className="form-control" id="nombre" type="text" name="nombre" placeholder="Nombre" value={this.state.nombre} onChange={this.handleChange} />
                    <label form="apellido">Apellido:</label>
                    <input className="form-control" id="apellido" type="text" name="apellido" placeholder="Apellido" value={this.state.apellido} onChange={this.handleChange} />
                    <label form="email">Email:</label>
                    <input className="form-control validate" id="email" type="email" name="Email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                    <label form="password">Passsword:</label>
                    <input className="form-control" id="password" type="password" name="Password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                    <label form="apellido">Nombre Novi@:</label>
                    <input className="form-control" id="novio2" type="text" name="novio2" placeholder="Nombre de un novi@" value={this.state.novio2} onChange={this.handleChange} />
                    <input type='button' onClick={() => {
                        this.crear();
                    }
                    } className={styles.button} value='Crear' />
                </form>
                {redireccion}
            </div>
        );
    }
}

