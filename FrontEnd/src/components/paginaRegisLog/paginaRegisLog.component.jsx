// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import Styles from './paginaRegisLog.css';

import { cloud } from '../../assets';
import { Formulario, LogIn } from '@Components';

import { Switch, Route, Link, BrowserRouter, Redirect } from 'react-router-dom';

import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
///////////// Component ////////////////
export class PaginaResgisLog extends Component {

    state = {
        logIn: true
    }

    change=()=>{
       
        this.setState({ logIn: !this.state.logIn });
        console.log(this.state.logIn)
    }
    
    render() {
        
        return (
            <div className={Styles.container}>
                <img src={cloud} className={Styles.image} />
                <div className={Styles.title}>Wedding Cloud</div>
               
                    {this.state.logIn ?

                        <div className="col-l6 mx-5">
                            <Formulario />
                            <a onClick={this.change}>LogIn</a>
                        </div>
                        :    <div className="col-l6 mx-5">
                        <LogIn />
                        <a onClick={this.change}>Registrarse</a>
                    </div>}

            </div>
        )
    }
}
