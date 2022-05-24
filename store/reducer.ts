import { Action, AppState, DISPATCH_ACTIONS } from "./constants";

const intialState : AppState = {
    user: null,
    banks: [],
    message: null
}

export default function reducer(state = intialState, action: Action) {
    switch(action.type){
        case DISPATCH_ACTIONS.REGISTER_USER:
            return {
                ...state,
                user: action.payload.user,
                message: action.payload.message
            }
        case DISPATCH_ACTIONS.ADD_BANK:
            return {
                ...state,
                banks: [...action.payload.banks],
                message: action.payload.message
            }
        case DISPATCH_ACTIONS.SET_MESSAGE:
            return {
                ...state,
                message: action.payload.message
            }
        default:
            return state;
    }

}