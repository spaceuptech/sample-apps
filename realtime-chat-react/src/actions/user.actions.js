import {
    userService
} from "../services/UserService";
import {
    userConstants
} from "../constants/user.constants";
import {
    history
} from '../helpers';
import { ChatActions } from "./chat.actions";

const signup = (username, password) => {

}

const login = (username, password) => {
    const loginRequest = () => {
        return {
            type: userConstants.LOGIN_REQUEST
        }
    }

    const loginSuccess = (user, token) => {
        return {
            type: userConstants.LOGIN_SUCCESS,
            user,
            token
        }
    }

    const loginFailure = (reason) => {
        return {
            type: userConstants.LOGIN_FAILURE,
            reason
        }
    }
    return dispatch => {
        dispatch(loginRequest());

        userService.login(username, password).subscribe(
            (data) => {
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("token", JSON.stringify(data.token))
                dispatch(loginSuccess(data.user, data.token));
                history.push('/')
            },
            (error) => {
                console.log("ERROR LOGGING IN", error)
                dispatch(loginFailure(error.toString()));
            }
        );
    };
}

const logout = () => {
    return dispatch => {
        dispatch(ChatActions.stopAllLiveQueries())
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        dispatch({
            type: userConstants.LOGOUT
        })
        history.push('/login')


    }
}


export const UserActions = {
    login,
    signup,
    logout
}