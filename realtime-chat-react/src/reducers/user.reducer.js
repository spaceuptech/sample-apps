/**
 * user.reducer.js is in charge of initializing store.state.user 
 * and updating values when user constants are dispatched.
 * 
 * @author 8byr0 <https://github.com/8byr0>
 */
import { userConstants } from "../constants/user.constants";
import { config } from "../services/config";


const existingUser = JSON.parse(localStorage.getItem('user'));
const userToken = JSON.parse(localStorage.getItem('token'));

// set Space-Cloud api token if existing (remembered user)
if (userToken) {
    config.api.setToken(userToken)
}

const initialState = {
    authenticated: false || ((existingUser !== null) && (userToken !== null)),
    isLoggingIn: false,
    user: null || existingUser,
    token: null || userToken,
    inactiveTimeout: 3000
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
        // Before calling login API
        case (userConstants.LOGIN_REQUEST):
            return {
                ...state,
                isLoggingIn: true
            }
        // On API call success
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