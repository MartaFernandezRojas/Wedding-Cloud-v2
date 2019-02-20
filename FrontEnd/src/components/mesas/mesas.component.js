//Import libraries
import React, { PureComponent } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ConnectNavbar } from '../navbar/navbar.component';
import styles from './mesas.styles.css';
import { Draggable, Droppable } from 'react-drag-and-drop'


///////////// Component ////////////////

export class Mesas extends PureComponent {

    state = {
        invitados: [],
        familiaNovio: [],
        familiaNovia: [],
        amigosNovio: [],
        amigosNovia: [],
        mesa: 0,
        id: null,
        novio1: '',
        novio2: '',
        invi:{}

    };

    componentDidMount() {
        this.start();
    }

    start = () => {
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        this.state.nombre = invitado.nombre;
        this.setState({invi:invitado })

        axios.get('http://localhost:3000/invitados/get', { params: { idb: invitado.id_boda } })
            .then(response => {
                this.setState({ invitados: response.data })
            })
        axios.get('http://localhost:3000/boda/novios', { params: { idb: invitado.id_boda } })
            .then(response => {
                this.setState({ novio1: response.data[0].novio1 })
                this.setState({ novio2: response.data[0].novio2 })
                axios.get('http://localhost:3000/admin/noviofamilia', { params: { parte1: this.state.novio1, idb: invitado.id_boda } })
                    .then(response => {
                        this.setState({ familiaNovio: response.data })
                    })
                axios.get('http://localhost:3000/admin/noviafamilia', { params: { parte2: this.state.novio2, idb: invitado.id_boda } })
                    .then(response => {
                        this.setState({ familiaNovia: response.data })
                    })
                axios.get('http://localhost:3000/admin/novioAmigos', { params: { parte1: this.state.novio1, idb: invitado.id_boda } })
                    .then(response => {
                        this.setState({ amigosNovio: response.data })
                    })
                axios.get('http://localhost:3000/admin/noviaAmigos', { params: { parte2: this.state.novio2, idb: invitado.id_boda } })
                    .then(response => {
                        this.setState({ amigosNovia: response.data })
                    })
            })
    }


    onDrop(mesa, idUser) {
        let user = {
            id: idUser.invitado,
            mesa: mesa,
        }
        axios.post('http://localhost:3000/invitados/updateMesa', user)
            .then(response => {
                this.start();
            })
        var invitado = JSON.parse(localStorage.getItem("invitado"));
        invitado.mesa = user.mesa;
        localStorage.setItem('invitado', JSON.stringify(invitado));
    }
    render() {
        var cont1 = 0;
         const redirect = this.state.invi.rol==0?<Redirect from="/mesas" to="/FormularioConfirmacion"/>:null
        return (
      
            <div className={styles.fondo}>
                <ConnectNavbar />
                <div className="container-fluid">
                    <h1 style={{ fontSize: "20px", color: "grey" }}>Planificador de mesas de {this.state.nombre}</h1>
                    <div className="row">

                        <div className="col l6 s12">
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 99)}>

                                <div className={styles.circlePres}><div><ul className={styles.listaPres}>
                                    <h3 style={{ fontSize: "15px" }}>PRESIDENCIAL</h3>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 99 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null'&& e.id_alergia != 'No') {
                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 99 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {

                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-secondary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                        <h1>cont1</h1>
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>

                        </div>
                        <div className="col l6 s12">
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 98)}>
                                <div className={styles.desasignados}><div><ul className={styles.listaPres}>
                                    <h3 style={{ fontSize: "15px" }}>Limbo</h3>
                                    {this.state.invitados.map((e, index) => {


                                        if (e.mesa == 98 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null'&& e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 98 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {

                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-secondary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }

                                        <h1>cont1</h1>
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                        </div>
                        <div className="col l3">
                            <p>Limbo</p>
                            <ul className={styles.lista}>
                                {this.state.invitados.map((e, index) => {
                                    if (e.mesa == 0 && e.confirmacion == "Confirmado" && e.id_alergia != 'null' && (e.parte == "null" || e.familia == "null") && e.id_alergia != 'No') {
                                        return (
                                            <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                        )
                                    } else if (e.mesa == 0 && e.confirmacion == "Confirmado" && (e.parte == "null" || e.familia == "null")) {
                                        return (<Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>)
                                    }

                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l3 s6">
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 1)}>

                                <div className={styles.circle}>  <h3>1</h3><div><ul className={styles.lista}>

                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 1 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {
                                            cont1++;
                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 1 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            cont1++;
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-secondary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                        <h1>cont1</h1>
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 5)}>
                                <div className={styles.circle}><h3>5</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 5 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 5 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-primary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 9)}>
                                <div className={styles.circle}><h3>9</h3><div><ul className={styles.lista}>


                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 9 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 9 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-secondary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}

                                </ul>
                                </div>
                                </div>
                            </Droppable>
                        </div>
                        <div className="col l3 s6">
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 2)}>
                                <div className={styles.circle}><h3>2</h3><div><ul className={styles.lista}>
                                    <div className="col l6">
                                        {this.state.invitados.map((e, index) => {
                                            if (e.mesa == 2 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                                return (

                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            } else if (e.mesa == 2 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                                return (
                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-primary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            }
                                        })}
                                    </div>
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 6)}>
                                <div className={styles.circle}><h3>6</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 6 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 6 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-warning"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 10)}>
                                <div className={styles.circle}><h3>10</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 10 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 10 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-primary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                        </div>
                        <div className="col l3 s6">
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 3)}>
                                <div className={styles.circle}><h3>3</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 3 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 3 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-warning"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}

                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 7)}>
                                <div className={styles.circle}><h3>7</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 7 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 7 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-primary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 11)}>
                                <div className={styles.circle}><h3>11</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 11 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 11 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-warning"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}

                                </ul>
                                </div>
                                </div>
                            </Droppable>
                        </div>
                        <div className="col l3 s6">
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 4)}>
                                <div className={styles.circle}><h3>4</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 4 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 4 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-warning"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}

                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 8)}>
                                <div className={styles.circle}><h3>8</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 8 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (

                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 8 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-primary"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}
                                </ul>
                                </div>
                                </div>
                            </Droppable>
                            <Droppable
                                types={['invitado']} // <= allowed drop types
                                onDrop={this.onDrop.bind(this, 12)}>
                                <div className={styles.circle}><h3>12</h3><div><ul className={styles.lista}>
                                    {this.state.invitados.map((e, index) => {
                                        if (e.mesa == 12 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        } else if (e.mesa == 12 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                            return (
                                                <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-warning"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                            )
                                        }
                                    })}

                                </ul>
                                </div>
                                </div>
                            </Droppable>
                        </div>
                        <div className={styles.etiquetas}>
                            <div className="row">
                                <div className="col l3">
                                    <p>Familia de {this.state.novio1}</p>
                                    <div className={styles.emoji}>
                                        <ul className={styles.lista}>
                                            {this.state.familiaNovio.map((e, index) => {




                                                if (e.mesa == 0 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                                    return (
                                                        <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                    )
                                                } else if (e.mesa == 0 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                                    return (
                                                        <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-light"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col l3">
                                    <p>Familia {this.state.novio2}</p>
                                    <ul className={styles.lista}>
                                        {this.state.familiaNovia.map((e, index) => {
                                            if (e.mesa == 0 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                                return (

                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            } else if (e.mesa == 0 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                                return (
                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-light"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div className="col l3">
                                    <p>Amigos de {this.state.novio1}</p>
                                    <ul className={styles.lista}>
                                        {this.state.amigosNovio.map((e, index) => {
                                            if (e.mesa == 0 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                                return (
                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            } else if (e.mesa == 0 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                                return (
                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-light"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                                <div className="col l3">
                                    <p>Amigos de {this.state.novio2}</p>
                                    <ul className={styles.lista}>
                                        {this.state.amigosNovia.map((e, index) => {

                                            if (e.mesa == 0 && e.id_alergia != 'null' && e.confirmacion != "Ausente" && e.confirmacion != 'null' && e.id_alergia != 'No') {

                                                return (
                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-danger"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            } else if (e.mesa == 0 && e.confirmacion != "Ausente" && e.confirmacion != 'null') {
                                                return (
                                                    <Draggable type="invitado" data={e.id}><li className="list-group-item list-group-item-light"><p><img className={styles.foto} src={`http://localhost:3000/${e.url}`} /> {e.nombre} {e.apellido}</p></li></Draggable>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {redirect}
            </div>
        )
    }
}


