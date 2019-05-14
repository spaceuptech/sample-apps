/**
 * UserService.js handles all authentication related operations like:
 * - sign in
 * - sign up
 * - logout
 * 
 * @author 8byr0 <https://github.com/8byr0>
 */
import { config } from "./config";
import { cond } from "space-api";

/**
 * Update user object in space-cloud.
 * This function is used to update active status.
 * @param {Object} user the user to update
 */
function updateUser(user) {
    return new Promise((resolve, reject) => {
        config.db.updateOne('users')
            .where(cond('_id', '==', user._id))
            .set(user)
            .apply()
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            });
    });
}

/**
 * Attempt to login a user to space cloud API.
 * This function updates config token in order for other calls to be successfull.
 * @param {string} username username of the user
 * @param {string} password password of the user
 * @returns {Promise}
 */
function login(username, password) {
    return new Promise((resolve, reject) => {
        config.db.signIn(username, password).then(res => {
            if (res.status === 200) {

                config.api.setToken(res.data.token)

                resolve({
                    user: res.data.user,
                    token: res.data.token
                })


            } else {
                reject("Unable to sign in: " + res.data.error)
            }
        })
    })

}

/**
 * Sign up a new user to space cloud API
 * @param {string} email email of the user
 * @param {string} username username of the user
 * @param {string} password password of the user
 * @returns {Promise}
 */
function signup(email, username, password) {
    return new Promise((resolve, reject) => {
        config.db.signUp(email, username, password, 'default').then(res => {
            if (res.status === 200) {
                resolve({
                    user: res.data.user,
                    token: res.data.token
                })
            } else {
                reject("Unable to sign up: " + res.data.error)
            }
        })
    })

}

/**
 * Logout active user. 
 * This function resets Space-Cloud's api token to null so that new call 
 * will no longer success.
 */
const logout = () => {
    return new Promise((resolve, reject) => {
        config.api.setToken(null)
    });
}

export const userService = {
    signup,
    login,
    logout,
    updateUser
};