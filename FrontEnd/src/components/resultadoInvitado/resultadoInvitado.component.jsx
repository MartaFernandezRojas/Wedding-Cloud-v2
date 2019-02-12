// // Import libraries
// import React, { Component } from 'react';
// import axios from 'axios';

// import { connect } from 'react-redux';
// import { getInv } from '@Models';
// import { FormularioConfirmacion } from '../formConfirmacion';
// import styles from '../../routes/router/router.styles.css';
// import { Switch, Redirect, BrowserRouter, } from 'react-router-dom';

// ///////////// Component ////////////////
// export class ResultadoInvitado extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//         };
//     }
//     componentDidMount() {
//         var invitado = JSON.parse(localStorage.getItem("invitado"));
//         this.setState(invitado);
//         axios.get('http://localhost:3000/invitados/getMofificar', { params: { idb: invitado.id_boda, id: invitado.id } })
//             .then(response => {
//                 this.setState(response.data[0])
//             })
//     }

//     render() {
//         return (
//             <div>
//                 <h5>Los datos que hemos enviado a los novios son:</h5>
//                 <ul>
//                     <li>Nombre: {this.state.nombre}</li>
//                     <li>Apellido:{this.state.apellido}</li>
//                     <li>Email: {this.state.email}</li>
//                     <li>Parte:{this.state.parte}</li>
//                     <li>Familia:{this.state.familia}</li>
//                     <li>Fiesta preboda:{this.state.fiestapreboda}</li>
//                     <li>Alergias:{this.state.id_alergia}</li>
//                     <li>Comentarios:{this.state.comentarios}</li>
//                 </ul>
//             </div>
//         )
//     }
// }



// const mapStateToProps = (state, ownProps) =>({
//     invitadoResultado: state.rootReducer.invitadoResultado,
//     user: ownProps.user
// });

// const mapDispatchToProps = {
//     getInvitado: getInv
// }

// export const ResultadoInvitadoConnect = connect(mapStateToProps, mapDispatchToProps)(ResultadoInvitado);
