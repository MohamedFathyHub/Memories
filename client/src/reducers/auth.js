import { AUTH , LOGOUT} from "../constants/actionTypes";

export default (state={ authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload })) /*Store it in the local storage,when Refershing the page the data won't be lost*/
            return { ...state, authData: action?.payload }
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData: null }
        default:
           return state;
    }
}