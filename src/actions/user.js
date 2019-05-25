import actionTypes from './actionTypes'
import { loginRequests } from '../requests'

const startLogin = () => {
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            userInfo
        }
    }
}

const loginFiled = () => {
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('authToken')
    window.localStorage.removeItem('userInfo')
    window.localStorage.removeItem('userInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const loginOut = () => {
    return dispatch => {
        dispatch(loginFiled())
    }
}

export const login = (user) => {
    return dispatch => {
        dispatch(startLogin)
        loginRequests(user)
            .then(resp => {
                const {
                    authToken,
                    ...userInfo
                } = resp
                if (user.remember === true) {         
                    window.localStorage.setItem('authToken', authToken)
                    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                } else {
                    window.sessionStorage.setItem('authToken', authToken)
                    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                }
                dispatch(loginSuccess(resp))
            })
            .catch(() => {
                dispatch(loginFiled())
            })
    }
}