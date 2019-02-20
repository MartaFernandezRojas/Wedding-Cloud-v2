// Import libraries
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import styles from './gestionInvitados.styles.css';
import { ConnectNavbar } from '@Components'
import { style } from 'react-toastify';
//Import Stilos


///////////// Component ////////////////
export class GestionInvitados extends Component {

  state = {
    invi:{},
    nombre: '',
    invitados: [],
    dataPie: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120, 24, 52],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
            "#ac64ad"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#da92db"
          ]
        }
      ]
    }
  };


  componentDidMount() {
    var invitado = JSON.parse(localStorage.getItem("invitado"));
    this.state.nombre = invitado.nombre;
    this.setState({invi:invitado})
    axios.get('http://localhost:3000/invitados/get', { params: { idb: invitado.id_boda } })
      .then(response => {
        this.setState({ invitados: response.data })
      })

  }
  
  render() {
  
    const data = {
      columns: [
        {
          label: 'ID',
          field: 'ID',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Nombre',
          field: 'Nombre',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Apellido',
          field: 'Apellido',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Email',
          field: 'Email',
          sort: 'asc',
          width: 200
        },
        {
          label: 'Confirmacion',
          field: 'Confirmacion',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Parte de:',
          field: 'Parte de:',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Familia',
          field: 'Familia',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Alergia',
          field: 'Alergia',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Fiesta preboda',
          field: 'Fiesta preboda',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Mesa Asignada',
          field: 'Mesa Asignada',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Comentarios',
          field: 'Comentarios',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Foto',
          field: 'Foto',
          sort: 'asc',
          width: 100
        }
      ],
      rows: this.state.invitados,
    }
    const redirect = this.state.invi.rol==0?<Redirect from="/gestionInvitados" to="/FormularioConfirmacion"/>:null
    return (
      <div className={styles.fondo}>
        <ConnectNavbar />
        <div className="container">
          <div className="row">
            <div className="col l12">
              <h1 style={{ fontSize: "20px" }}> Registro de invitados {this.state.nombre}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col l12">
              <ul>
                <MDBDataTable 
                  striped
                  bordered
                  hover
                  data={data}
                  
                />
              </ul>
            </div>
          </div>
        </div>
        {redirect}
      </div>
    )
  }
}