import actionTypes from './actionTypes'

import { amountNotifications } from '../requests'

export const startPost = () => {
    return {
        type: actionTypes.START_NOTIFICATION_POST
    }
}

export const finishPost = () => {
    return {
        type: actionTypes.FINISH_NOTIFICATION_POST
    }
}

export const markNotificationAsReadById = (id) => {
    return dispatch => {
        dispatch(startPost())
        setTimeout(() => {
            dispatch({
                type: actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload: {
                    id
                }
            })
            dispatch(finishPost())
        },2000)
    }
}

export const markNotificationAsReadAll = () => {
    return dispatch => {
        dispatch(startPost())
        setTimeout(() => {
            dispatch({
                type: actionTypes.MARK_NOTIFICATION_AS_READ_ALL
            })
            dispatch(finishPost())
        },2000)
    }
}

export const getNotifications = () => {
    return dispatch => {
        dispatch(startPost())
        amountNotifications()
            .then(resp => {
                dispatch({
                    type: actionTypes.RECEIVED_NOTIFICATIONS,
                    payload: {
                        list: resp.list
                    }
                })
            })
        dispatch(finishPost())
    }
}