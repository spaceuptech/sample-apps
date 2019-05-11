import {
    userConstants
} from "../constants/user.constants";
import {
    config
} from "../services/config";



let existingUser = JSON.parse(localStorage.getItem('user'));
let userToken = JSON.parse(localStorage.getItem('token'));

// TODO 8byr0 move this elsewhere
if (userToken) {
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
        case (userConstants.LOGOUT):
            return {
                ...state,
                authenticated: false,
                user: null,
                token: null
            }
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
        case (userConstants.UPDATE_LAST_ACTIVE_TIME):
            return {
                ...state,
                user: {
                    ...state.user,
                    lastActiveTime: action.lastActiveTime
                }
            }

        default:
            return state
    }
}