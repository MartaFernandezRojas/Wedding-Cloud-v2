// Import libraries
import React, { Component } from 'react';
import axios from 'axios';

import { paginaInicio, paginaInicio2 } from '../../assets';
import { FormularioConfirmacion } from '../formConfirmacion';
import { NavbarInicio, Boda, Footer } from '@Components'
import style2 from './paginaInicio.css';
import { invitados, publicaciones, panelcontrol, mesas } from '../../assets';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBMask, MDBView } from 'mdbreact';
import { style } from 'react-toastify';
///////////// Component ////////////////
export class PaginaInicio extends Component {

    render() {
        return (
            <div>
                <NavbarInicio />
                <div className="container-fluid">

                    <div className={style2.wrapper}>
                        <section className={style2.bloque1}>
                        <p style={{color:"white"}}>Weddding Cloud</p>
                        <p style={{color:"white"}}>Deja a tu invitados en la nube</p>
                        </section>
                        <section className={style2.bloque2}>
                            <div className="row">
                                <div className="col l12">
                          
                                    <h2>Servicios de Weddding Cloud</h2>
                                </div>
                            </div>
                            <div className={style2.informacion}>
                                <div className="row">
                              
                                    <div className="col l3 m6">
                                        <MDBView hover>
                                            <img className="img-fluid" src={panelcontrol}></img>
                                            <MDBMask className="flex-center" overlay="black-strong">
                                                <h5 style={{fontSize:"18px"}} className="white-text">Desde el panel de control podras controlar a todos tus invitados</h5>
                                            </MDBMask>
                                        </MDBView>
                                    </div>
                                    <div className="col l3 m6">
                                        <MDBView hover>
                                            <img className="img-fluid" src={publicaciones}></img>
                                            <MDBMask className="flex-center" overlay="black-strong">
                                                <h5 style={{fontSize:"18px"}} className="white-text">Tanto los invitados como los novios podreis realizar publicaciones que os mantendrán en contacto 24x7</h5>
                                            </MDBMask>
                                        </MDBView>
                                    </div>
                                    <div className="col l3 m6">
                                        <MDBView hover>
                                            <img className="img-fluid" src={mesas}></img>
                                            <MDBMask className="flex-center" overlay="black-strong">
                                                <h5 style={{fontSize:"18px"}} className="white-text">Herramienta sencilla para la planificación de mesas</h5>
                                            </MDBMask>
                                        </MDBView>
                                    </div>
                                    <div className="col l3 m6">
                                        <MDBView hover>
                                            <img className="img-fluid" src={invitados}></img>
                                            <MDBMask className="flex-center" overlay="black-strong">
                                                <h5 style={{fontSize:"18px"}} className="white-text">Los invitados se autogestionaran y te informarán de su asistencia al evento, intolerancias...</h5>
                                            </MDBMask>
                                        </MDBView>
                                    </div>
                                   
                                </div>
                                
                            </div>
                        </section>
                        <section className={style2.bloque3}>
                        <p className={style2.title}>Crea tu boda</p>
                            <Boda />
                           
                        </section>
                        <section className={style2.bloque4}>
                        <Footer/>
                           
                        </section>
                       
                    </div>
                </div>
               
            </div >
        );
    }
}

