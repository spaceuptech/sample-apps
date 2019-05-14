/**
 * chat.actions.js contain all handlers dispatching actions to redux.
 * This handler call ChatService.js before dispatching.
 * 
 * @author 8byr0 <https://github.com/8byr0>
 */

import { ChatService } from "../services/ChatService";
import { ChatConstants } from "../constants/chat.constants";
import { store } from "../helpers/store";
import { notificationActions } from "./notifications.actions";
import * as _ from 'lodash'


/**
 * Trigger init actions. 
 * This function will start listening to chats and users.
 */
const loadInitialData = () => {
    return dispatch => {
        // Start listeners
        dispatch(listenToChats())
        dispatch(listenToUsers())
        dispatch(listenToThread("ALL"))
    }
}

/**
 * Stop all existing livequeries.
 * Used when logging out.
 * @authenticated
 */
const stopAllLiveQueries = () => {
    return dispatch => {
        // Stop all single threads listeners
        store.getState().chat.liveQueries.forEach(liveQuery => {
            liveQuery()
            dispatch({
                type: ChatConstants.REMOVE_LIVE_QUERY,
                liveQuery
            })
        })

        // Stop listening for new chats
        const chatsListener = store.getState().chat.chatsListener
        if (null !== chatsListener) {
            chatsListener()
        }

        // Stop listening for new users
        const usersListener = store.getState().chat.usersListener
        if (null !== usersListener) {
            usersListener()
        }
    }
}

/**
 * Dispatch an action to tell that a message has been read.
 * This will call Chat Service to update message document in collection.
 * @param {Object} message 
 */
const setMessageRead = (message) => {
    return dispatch => {
        ChatService.updateMessage({ ...message, read: true }).then(
            (res) => {

            }
        ).catch(
            (err) => {
                dispatch(notificationActions.failureMessage("Error while updating message metadata. Details: " + err))
            });

    }
}

/**
 * Dispatch an action to reset chat reducer to its initial state
 * Used in logout.
 * @authenticated
 */
const clearData = () => ({
    type: ChatConstants.CLEAR_DATA
})

/**
 * Listen to messages thread of a given chat.
 * This action instantiates 2 callbacks (onMessages & onError).
 * LiveQuery object is stored in chat reducer
 * @param {string} chatID id of the chat to listen to
 * @authenticated
 */
const listenToThread = (chatID) => {
    return dispatch => {
        const currentLiveQuery = ChatService.startMessagesRealtime(chatID).subscribe(
            /**
             * Callback triggered on new messages in given thread
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (newMessages, type) => {
                // TODO 8byr0 compare incoming list with existing to append only new messages
                if (newMessages.length > 0) {
                    dispatch({ type: ChatConstants.SET_CHAT_MESSAGES, chatID: chatID, messages: newMessages })
                }

            },

            /**
             * Callback triggered when something goes wrong
             * @param {*} err
             */
            (error) => {
                dispatch(notificationActions.failureMessage("An error occurred when listening to chat messages: " + error))
            })

        dispatch({
            type: ChatConstants.SAVE_LIVE_QUERY,
            liveQuery: currentLiveQuery
        })
    }
}


/**
 * Listen to new users / users updates.
 * This action instantiates 2 callbacks (onMessages & onError).
 * LiveQuery object is stored in chat reducer
 * @authenticated
 */
const listenToUsers = () => {
    return dispatch => {
        const newUsersListener = ChatService.startUsersRealtime().subscribe(
            /**
             * Callback triggered on new users registered / updated
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (rawUsers, type) => {
                let users = {}

                rawUsers.forEach((elt) => {
                    users[elt._id] = elt
                })
                users["ALL"] = { _id: "ALL", name: 'ALL' }

                const newUsersKeys = _.reduce(users, function (result, value, key) {
                    return _.isEqual(value, store.getState().chat.users[key]) ?
                        result : result.concat(key);
                }, []);

                newUsersKeys.forEach(key => {
                    dispatch({ type: ChatConstants.ADD_USER, user: users[key] })
                })
            },
            /**
             * Callback triggered when something goes wrong
             * @param {string} err
             */
            (error) => {
                dispatch(notificationActions.failureMessage("An error occurred when listening to new users: " + error))
            })

        dispatch({
            type: ChatConstants.SET_INCOMING_USERS_LISTENER,
            listener: newUsersListener
        })
    }
}


/**
 * Listen to active user chats.
 * This action instantiates 2 callbacks (onMessages & onError).
 * LiveQuery object is stored in chat reducer
 * @authenticated
 */
const listenToChats = () => {
    return dispatch => {
        const newChatsListener = ChatService.startChatsRealtime().subscribe(
            /**
             * Callback triggered on new chats created
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (chats, type) => {
                const newChats = _.differenceWith(chats, store.getState().chat.chats, _.isEqual);
                
                newChats.forEach((chat) => {
                    dispatch({ type: ChatConstants.ADD_CHAT, chat })
                    dispatch({
                        type: ChatConstants.CREATE_MESSAGES_LIST_IF_NOT_EXIST,
                        chatID: chat._id
                    })
                    dispatch(listenToThread(chat._id))
                })
            },


            /**
             * Callback triggered when something goes wrong
             * @param {*} err
             */
            (error) => {
                dispatch(notificationActions.failureMessage("An error occurred when listening to new discussions: " + error))
            })

        dispatch({
            type: ChatConstants.SET_INCOMING_CHATS_LISTENER,
            listener: newChatsListener
        })
    }
}


/**
 * Set the active chat of the app (the one opened on the right)
 * @param {string} partnerID 
 */
const openChat = (discussionID) => {
    return dispatch => {
        dispatch({ type: ChatConstants.OPEN_CHAT_REQUEST });

        dispatch({
            type: ChatConstants.OPEN_CHAT_SUCCESS,
            id: discussionID
        });
    };
}

/**
 * Send a new message
 * @param {string} chatID id of the chat
 * @param {string} text text of the message
 */
const sendMessage = (chatID, text) => {
    return dispatch => {
        dispatch({ type: ChatConstants.SEND_MESSAGE_REQUEST });
        // Call chat service function
        ChatService.sendMessage(chatID, text).then(
            res => {
                dispatch({ type: ChatConstants.SEND_MESSAGE_SUCCESS });
            }).catch(
                (error) => {
                    // In case of error dispatch an FAILURE notice
                    dispatch({
                        type: ChatConstants.SEND_MESSAGE_FAILURE,
                        error: error.toString()
                    });
                    dispatch(notificationActions.failureMessage("Unable to send message, please try again. Details: " + error))
                }
            );
    };
}

/**
 * Create a new chat with given partner.
 * If a chat already exists with this partner, it will be opened on the right of UI. 
 * Otherwise, a chat creation request is sent to Space-Cloud
 * @param {string} partnerID id of the partner
 */
const startChatWith = (partnerID) => {
    return dispatch => {
        const existingChatWithPartner = store.getState().chat.chats.filter((chat) => chat.from === partnerID || chat.to === partnerID)

        if (existingChatWithPartner.length > 0) {
            // Well, there is already a discussion with our pal, let's open it
            dispatch(openChat(existingChatWithPartner[0]._id));
        } else {

            dispatch({ type: ChatConstants.START_CHAT_REQUEST });
            // Call chat service function
            ChatService.createChat(partnerID).then(
                (chat) => {
                    dispatch(openChat(chat._id))
                }).catch(
                    (error) => {
                        // In case of error dispatch an FAILURE notice
                        dispatch({
                            type: ChatConstants.START_CHAT_FAILURE,
                            error: error.toString()
                        });
                        dispatch(notificationActions.failureMessage("Unable to create chat, please try again. Details: " + error))
                    }
                );
        };
    };
}

export const ChatActions = {
    setMessageRead,
    loadInitialData,
    openChat,
    sendMessage,
    stopAllLiveQueries,
    clearData,
    startChatWith,
}