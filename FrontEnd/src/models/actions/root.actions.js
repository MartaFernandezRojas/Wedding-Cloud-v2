import axios from'axios';
const mensajeInvitado = payload => ({ payload, type: 'MENS_INV' });
const Invitados = payload => ({ payload, type: 'INV' });

export const mensInv = inv => dispatch => {
    axios.post('http://localhost:3000/mensajes/getMensajes', { idb: inv.idb} )
      .then(response => {
        dispatch(mensajeInvitado(response.data))
      })
      .catch(err=>{
        console.log(err)
      })
}

export const Inv = inv => dispatch => {
  axios.post('http://localhost:3000/mensajes/postMens', { idb: inv.idb} )
    .then(response => {
      dispatch(Invitados(response.data))
      console.log(response.data)
    })
    .catch(err=>{
      console.log(err)
    })
}