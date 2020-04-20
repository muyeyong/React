import store from 'store'

const USER_KEY = 'user_key'
const USER_AUTH = 'user_auth'

export default {
    saveUser(user) {
        // localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY, user || {})
    },

    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY || '{}'))
        return store.get(USER_KEY) || {}
    },

    removeUser() {
        // localStorage.removeItem(USER_KEY)
        store.remove(USER_KEY)
    },
    saveUserAuth(auth) {
        store.set(USER_AUTH, auth || false)
    },
    getUserAuth() {
        return store.get(USER_AUTH) || false;
    },
    removeUserAuth() {
        store.remove(USER_AUTH)
    }

}