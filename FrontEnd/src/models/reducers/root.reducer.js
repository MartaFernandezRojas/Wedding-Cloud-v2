const initialRootState = {
    mensajes:[],
    invitados:[],
    respuestas:{},
    privados:[],
    privados2:[],
    respuestasPriv:{},

}
export function rootReducer(state = initialRootState, action) {
    switch (action.type) {
        case 'MENS_INV':
        return{
            ...state,
            mensajes: action.payload,
        }
        case 'INV':
        return{
            ...state,
            invitados: action.payload,
        }

        case 'POST_MENS':
        return{
            ...state,
            mensajes: [...state.mensajes, action.payload]
        }
        case 'POST_RESP':
        return{
            ...state,
            respuestas:{...state.respuestas, [action.payload.id]: [...state.respuestas[action.payload.id],action.payload.resp]}
        } 
        case 'GET_RESP':
        return{
            ...state,
            respuestas:{...state.respuestas, [action.payload.id]: action.payload.resp }
        }
        case 'DEL_MENS':
        return{
            ...state,
            mensajes: state.mensajes.filter(value=>value.id_men !== action.payload.id),
        }
        case 'PRIV_MENS':
        return{
            ...state,
            privados: action.payload
        }
        case 'PRIV_MENS2':
        return{
            ...state,
            privados2: [action.payload]
        }
        case 'DEL_PRIV':
        return{
            ...state,
            privados: state.privados.filter(value=>value.id!== action.payload.id)
        }
        case 'POST_RESP_PRIV':
        return{
            ...state,
            respuestasPriv:{...state.respuestasPriv, [action.payload.id]: [...state.respuestasPriv[action.payload.id],action.payload.resp]}
        } 
        case 'GET_RESP_PRIV':
        return{
            ...state,
            respuestasPriv:{...state.respuestasPriv, [action.payload.id]: action.payload.resp }
        }
        default:
            return state;
    }
}