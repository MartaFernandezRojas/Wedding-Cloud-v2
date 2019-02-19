import axios from'axios';
import { CLIENT_RENEG_LIMIT } from 'tls';
const mensajeInvitado = payload => ({ payload, type: 'MENS_INV' });
const Invitados = payload => ({ payload, type: 'INV' });
const postMensaje = payload => ({ payload, type: 'POST_MENS' });
const postRespuesta = payload => ({ payload, type: 'POST_RESP' });
const getRespuesta = payload => ({ payload, type: 'GET_RESP' });
const deleteMens = payload=>({payload, type: 'DEL_MENS'})
const postPrivado=payload=>({payload, type: 'PRIV_MENS'})
const borrarPriv = payload=>({payload, type: 'DEL_PRIV'})
const postPrivado2=payload=>({payload, type: 'PRIV_MENS2'})
const postRespPri = payload => ({ payload, type: 'POST_RESP_PRIV' });
const getRespuestaPriv = payload => ({ payload, type: 'GET_RESP_PRIV' });
const deleteInvi = payload=>({payload, type: 'DEL_INV'})

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

export const postMens = m => dispatch => {
  console.log(m)
  axios.post('http://localhost:3000/mensajes/postMensaje', m )
    .then(response => {
      dispatch(postMensaje(response.data))
      console.log(response.data)
    })
    .catch(err=>{
      console.log(err)
    })
}

export const postResp = m => dispatch => {

  axios.post('http://localhost:3000/mensajes/postRespuesta', m )
    .then(response => {
      dispatch(postRespuesta({resp:response.data,id: m.id_mensaje }))
    })
    .catch(err=>{
      console.log(err)
    })
}

export const getResp = m => dispatch => {
  axios.post('http://localhost:3000/mensajes/getRespuesta', m )
    .then(response => {
      dispatch(getRespuesta({resp:response.data,id: m.id_mensaje }))

    })
    .catch(err=>{
      console.log(err)
    })
}

export const deleteMensaje = m => dispatch=> {
  axios.post('http://localhost:3000/mensajes/mensajeDelete', m )
    .then(response => {
      dispatch(deleteMens({id:m.id_mensaje}))
    })
    .catch(err=>{
      console.log(err)
    })
}

export const mensPriv = mens => dispatch => {
  axios.post('http://localhost:3000/mensajes/getmensajePriv', { id_invReceptor: mens.id_invReceptor} )
    .then(response => {
      dispatch(postPrivado(response.data))
    })
    .catch(err=>{
      console.log(err)
    })
}
export const mensPriv2 = mens => dispatch => {
  axios.post('http://localhost:3000/mensajes/getmensajePriv2', { id_invitado: mens.id_invitado} )
    .then(response => {
      dispatch(postPrivado2(response.data))
    })
    .catch(err=>{
      console.log(err)
    })
}

export const borrarPriva = mens => dispatch => {
  axios.post('http://localhost:3000/mensajes/privadoDelete', { id: mens.id} )
    .then(response => {
      dispatch(borrarPriv(response.data))
    })
    .catch(err=>{
      console.log(err)
    })
}

export const postRespPriv = m => dispatch => {

  axios.post('http://localhost:3000/mensajes/postRespuestaPriv', m )
    .then(response => {
      console.log(response)
      dispatch(postRespPri({resp:response.data,id: response.data.id_mensajePriv }))
    })
    .catch(err=>{
      console.log(err)
    })
}

export const getRespPriv = m => dispatch => {
  axios.post('http://localhost:3000/mensajes/getRespuestasPriv', m )
    .then(response => {
      dispatch(getRespuestaPriv({resp:response.data,id: m.id_mensajePriv  }))

    })
    .catch(err=>{
      console.log(err)
    })
}
export const deleteInv = inv => dispatch=> {
  axios.post('http://localhost:3000/invitados/delete', inv )
    .then(response => {
      dispatch(deleteInvi({id:inv.id}))
    })
    .catch(err=>{
      console.log(err)
    })
}
