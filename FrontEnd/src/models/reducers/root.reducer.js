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
        default:
            return state;
    }
}