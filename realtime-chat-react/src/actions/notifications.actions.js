import React from 'react'
import '../notifications.css'

import {
    createNotification,
    NOTIFICATION_TYPE_SUCCESS,
    NOTIFICATION_TYPE_ERROR,
    NOTIFICATION_TYPE_WARNING,
    NOTIFICATION_TYPE_INFO
} from 'react-redux-notify';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'

const iconsMapping = {
    [NOTIFICATION_TYPE_ERROR]: <ErrorOutlineIcon />,
    [NOTIFICATION_TYPE_INFO]: <InfoIcon />,
    [NOTIFICATION_TYPE_WARNING]: <WarningIcon />,
    [NOTIFICATION_TYPE_SUCCESS]: <CheckCircleOutlineIcon />
}

const createNotificationContent = (message, type, duration) => {
    const content = {
        message: message,
        type: type,
        duration: duration,
        canDismiss: true,
        icon: iconsMapping[type],
        customStyles: {
            'position': 'containerTopCenter',
            'content': 'customContent'
        }
    }
    return content
}

const failureMessage = (message, duration = 3000) => {
    return dispatch => {
        dispatch(createNotification(createNotificationContent(message, NOTIFICATION_TYPE_ERROR, duration)))
    }
}
const successMessage = (message, duration = 3000) => {
    return dispatch => {
        dispatch(createNotification(createNotificationContent(message, NOTIFICATION_TYPE_SUCCESS, duration)))
    }
}
const infoMessage = (message, duration = 3000) => {
    return dispatch => {
        dispatch(createNotification(createNotificationContent(message, NOTIFICATION_TYPE_INFO, duration)))
    }
}

export const notificationActions = {
    failureMessage,
    successMessage,
    infoMessage
}