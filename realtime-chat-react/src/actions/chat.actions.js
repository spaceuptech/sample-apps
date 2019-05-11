import { ChatService } from "../services/ChatService";
import { ChatConstants } from "../constants/chat.constants";
import { store } from "../helpers/store";
import { notificationActions } from "./notifications.actions";
import * as _ from 'lodash'

/**
 * Stop all existing livequeries.
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

        // Stop listening for new discussions
        const discussionsListener = store.getState().chat.discussionsListener
        if (null !== discussionsListener) {
            discussionsListener()
        }
    }
}

/**
 * Dispatch an action to reset
 * chat reducer to its initial state
 * @authenticated
 */
const clearData = () => ({
    type: ChatConstants.CLEAR_DATA
})

/**
 * Listen to messages thread of a given chat.
 * This action instantiates 2 callbacks (onMessages & onError).
 * LiveQuery object is stored in chat reducer
 * @param {Object} chat 
 * @authenticated
 */
const listenToThread = (discussionID) => {
    return dispatch => {
        const currentLiveQuery = ChatService.startMessagesRealtime(discussionID).subscribe(
            /**
             * Callback triggered on new messages in given thread
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (docs, type) => {
                // TODO 8byr0 compare incoming list with existing to append only new messages
                const messages = docs
                if (docs.length > 0) {
                    dispatch({ type: ChatConstants.SET_DISCUSSION_MESSAGES, discussionID: discussionID, messages: messages })
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
 * Listen to newly created users.
 * @authenticated
 */
const listenToUsers = () => {
    return dispatch => {
        const newUsersListener = ChatService.startUsersRealtime().subscribe(
            /**
             * Callback triggered on new users registered
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (rawUsers, type) => {
                let users = {}

                rawUsers.forEach((elt) => {
                    users[elt._id] = elt
                })
                users["ALL"] = { _id: "ALL", name: 'ALL' }

                const newUsersKeys = _.reduce(users, function(result, value, key) {
                    return _.isEqual(value, store.getState().chat.users[key]) ?
                        result : result.concat(key);
                }, []);

                newUsersKeys.forEach(key => dispatch({type: ChatConstants.ADD_USER, user: users[key]}))
            },


            /**
             * Callback triggered when something goes wrong
             * @param {*} err
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
 * Listen to newly created discussions.
 * @authenticated
 */
const listenToDiscussions = () => {
    return dispatch => {
        const newDiscussionsListener = ChatService.startChatsRealtime().subscribe(
            /**
             * Callback triggered on new chats created
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (chats, type) => {
                const newChats = _.differenceWith(chats, store.getState().chat.chats, _.isEqual);

                newChats.forEach((chat) => {
                    dispatch({type: ChatConstants.ADD_CHAT, chat})
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
            type: ChatConstants.SET_INCOMING_DISCUSSIONS_LISTENER,
            listener: newDiscussionsListener
        })
    }
}

const retrieveUsers = (launchRealTime = false) => {
    return dispatch => {
        if (launchRealTime === true) {
            dispatch(listenToUsers())
        }
    }
}
const retrieveChats = (launchRealTime = false) => {
    return dispatch => {
        if (launchRealTime === true) {
            dispatch(listenToDiscussions())
        }
    }
}
const retrieveMessages = () => {
    return dispatch => {
        ChatService.getMessages().then(
            (messages) => {
                dispatch({ type: ChatConstants.SET_MESSAGES, messages })
            }).catch(
                (error) => {
                    dispatch(notificationActions.failureMessage("An error occurred when retrieving messages: " + error))
                }
            )
    }
}

const loadInitialData = () => {
    return dispatch => {
        dispatch(retrieveChats(true));
        dispatch(retrieveUsers(true));
        dispatch(retrieveMessages());
    }
}

/**
 * Set the active chat of the app
 * @param {string} partnerID 
 */
const openDiscussion = (discussionID) => {
    return dispatch => {
        dispatch({ type: ChatConstants.OPEN_DISCUSSION_REQUEST });

        dispatch({
            type: ChatConstants.OPEN_DISCUSSION_SUCCESS,
            id: discussionID
        });
    };
}

/**
 * Send a new message
 * @param {string} partnerID id of the partner
 * @param {string} text text of the message
 */
const sendMessage = (discussionID, text) => {
    return dispatch => {
        dispatch({ type: ChatConstants.SEND_MESSAGE_REQUEST });
        // Call chat service function
        ChatService.sendMessage(discussionID, text).then(
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
 * Send a new message
 * @param {string} partnerID id of the partner
 */
const startChatWith = (partnerID) => {
    return dispatch => {
        const existingDiscussionsWithPartner = store.getState().chat.chats.filter((chat) => chat.from === partnerID || chat.to === partnerID)

        if (existingDiscussionsWithPartner.length > 0) {
            // Well, there is already a discussion with our pal, let's open it
            dispatch(openDiscussion(existingDiscussionsWithPartner[0]._id));
        } else {

            dispatch({ type: ChatConstants.START_CHAT_REQUEST });
            // Call chat service function
            ChatService.createChat(partnerID).then(
                (chat) => {
                    dispatch(openDiscussion(chat._id))
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
    loadInitialData,
    openDiscussion,
    sendMessage,
    stopAllLiveQueries,
    clearData,
    startChatWith
}