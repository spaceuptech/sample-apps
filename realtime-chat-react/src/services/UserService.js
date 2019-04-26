import {
    config
} from "./config";
import { history } from '../helpers';

import { Observable } from 'rxjs/Observable';

export const rejectionCause = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
}

export const userService = {
    login,
};

function login(username, password) {

    return Observable.create((observer) => {
        config.db.signIn(username, password).then(res => {
            if (res.status === 200) {
                config.api.setToken(res.data.token)

                observer.next({user: res.data.user, token: res.data.token})
                history.push('/')

            }else{
                observer.error("Unable to sign in")
            }
        })
    })

}
