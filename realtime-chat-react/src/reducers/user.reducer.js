import {
    userConstants
} from "../constants/user.constants";
import { config } from "../services/config";



let existingUser = JSON.parse(localStorage.getItem('user'));
let userToken = JSON.parse(localStorage.getItem('token'));

// TODO move this elsewhere
if(userToken){
    config.api.setToken(userToken)
}

const initialState = {
    authenticated: false || ((existingUser !== null) && (userToken !== null)),
    isLoggingIn: false,
    user: null || existingUser,
    token: null || userToken
}

export const user = (state = initialState, action) => {
    switch (action.type) {
        case (userConstants.LOGIN_REQUEST):
            return {
                ...state,
                isLoggingIn: true
            }
        case (userConstants.LOGIN_SUCCESS):
            return {
                ...state,
                isLoggingIn: false,
                authenticated: true,
                user: action.user,
                token: action.token
            }

        default:
            return state
    }
}