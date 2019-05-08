import {
    config
} from "./config";

import {
    Observable
} from 'rxjs/Observable';
import { cond } from "space-api";

export const rejectionCause = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

/**
 * Update user object in space-cloud
 * @param {Object} user new user
 */
async function updateUser(user) {
    await config.db.updateOne('users').where(cond('_id', '==', user._id))
        .set(user).apply().then(res => ({ res })).catch(err => { throw err });
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
                observer.error("Unable to sign in: " + res.data.error)
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
                observer.error("Unable to sign up: " + res.data.error)
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
    logout,
    updateUser
};