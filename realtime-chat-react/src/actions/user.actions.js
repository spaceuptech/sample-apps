import {
    userService
} from "../services/UserService";
import {
    userConstants
} from "../constants/user.constants";




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
            },
            (error) => {
                console.log("ERROR LOGGING IN", error)
                dispatch(loginFailure(error.toString()));
            }
        );
    };


}


export const UserActions = {
    login
}