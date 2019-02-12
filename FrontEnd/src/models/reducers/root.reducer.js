const initialRootState = {
    mensajes:[],
    invitados:[]

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
        default:
            return state;
    }
}