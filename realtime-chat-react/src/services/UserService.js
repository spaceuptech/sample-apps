import {
    config
} from "./config";

import {
    Observable
} from 'rxjs/Observable';

export const rejectionCause = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}


function login(username, password) {

    return Observable.create((observer) => {
        config.db.signIn(username, password).then(res => {
            if (res.status === 200) {
                config.api.setToken(res.data.token)

                observer.next({
                    user: res.data.user,
                    token: res.data.token
                })


            } else {
                observer.error("Unable to sign in")
            }
        })
    })

}

function signup(email, username, password) {

    return Observable.create((observer) => {
        config.db.signUp(email, username, password, 'default').then(res => {
            if (res.status === 200) {
                observer.next({
                    user: res.data.user,
                    token: res.data.token
                })
            } else {
                observer.error("Unable to sign up")
            }
        })
    })

}

const logout = async () => {
    config.api.setToken(null)
}

export const userService = {
    signup,
    login,
    logout
};