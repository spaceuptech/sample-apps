import { ChatService } from "../services/ChatService";
import { ChatConstants } from "../constants/chat.constants";
import { store } from "../helpers/store";


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
        store.getState().chat.chatsListener()
        // Stop listening for new users
        store.getState().chat.usersListener()
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
 * Add a new chat to the list. 
 * Dispatch this action on new incoming chat (created post-init)
 * @param {Object} chat 
 * @authenticated
 */
const addChat = (chat) => ({
    type: ChatConstants.ADD_CHAT,
    chat
})

/**
 * Listen to messages thread of a given chat.
 * This action instantiates 2 callbacks (onMessages & onError).
 * LiveQuery object is stored in chat reducer
 * @param {Object} chat 
 * @authenticated
 */
const listenToThread = (chat) => {
    return dispatch => {
        const currentLiveQuery = ChatService.startMessagesRealtime(chat.user._id).subscribe(
            /**
             * Callback triggered on new messages in given thread
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (docs, type) => {
                // TODO 8byr0 compare incoming list with existing to append only new messages

                if (docs.length > 0) {
                    dispatch(setDiscussionMessages(chat, docs))
                }

            },
            /**
             * Callback triggered when something goes wrong
             * @param {*} err
             */
            (err) => {
                // TODO handle error
                console.log('Operation failed:', err)
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
            (docs, type) => {
                // TODO
            },

            /**
             * Callback triggered when something goes wrong
             * @param {*} err
             */
            (err) => {
                // TODO
            })

        dispatch({
            type: ChatConstants.SET_INCOMING_USERS_LISTENER,
            listener: newUsersListener
        })
    }
}

/**
 * Listen to new chats.
 * Instantiated callback may be triggered when someone 
 * starts a discussion with active user
 * @authenticated
 */
const listenToChats = () => {
    return dispatch => {
        const newChatsListener = ChatService.startChatsRealtime().subscribe(
            /**
             * Callback triggered on new messages in given thread
             * @param {Array<Object>} docs 
             * @param {*} type 
             */
            (docs, type) => {

            },

            /**
             * Callback triggered when something goes wrong
             * @param {*} err
             */
            (err) => {

            })

        dispatch({
            type: ChatConstants.SET_INCOMING_CHATS_LISTENER,
            listener: newChatsListener
        })
    }
}


/**
 * Load initial list of chats
 * Will be fetched from space-cloud
 * @authenticated
 */
const loadChatList = () => {
    return dispatch => {
        dispatch({ type: ChatConstants.LOAD_LIST_REQUEST });

        ChatService.getChatsList().subscribe(
            list => {
                // Dispatch fetched list of chats
                dispatch({
                    type: ChatConstants.LOAD_LIST_SUCCESS,
                    list
                });

                list.forEach((elt) => {
                    // For each discussion start listening to incoming messages
                    dispatch(listenToThread(elt))
                })

                // Listen to newly created chats
                dispatch(listenToChats())

                // Listen to newly created users
                dispatch(listenToUsers())
            },
            (error) => {
                dispatch({
                    type: ChatConstants.LOAD_LIST_FAILURE,
                    error: error.toString()
                });
            }
        );
    };
}

/**
 * Set the messages of a given chat
 * @param {Object} chat 
 * @param {Array<Object>} messages 
 */
const setDiscussionMessages = (chat, messages) => {
    return {
        type: ChatConstants.REFRESH_MESSAGES,
        discussion: chat,
        messages: messages
    }
}

/**
 * Set the active chat of the app
 * TODO pass only id instead of full object
 * @param {Object} chat 
 */
const openDiscussion = (chat) => {
    return dispatch => {
        dispatch({ type: ChatConstants.OPEN_DISCUSSION_REQUEST });
        dispatch({
            type: ChatConstants.OPEN_DISCUSSION_SUCCESS,
            id: chat.user._id
        });
    };
}

/**
 * Send a new message
 * @param {string} partnerID id of the partner
 * @param {string} text text of the message
 */
const sendMessage = (partnerID, text) => {
    return dispatch => {
        dispatch({ type: ChatConstants.SEND_MESSAGE_REQUEST });
        // Call chat service function
        ChatService.sendMessage(partnerID, text).subscribe(
            res => {
                dispatch({ type: ChatConstants.SEND_MESSAGE_SUCCESS });
            },
            (error) => {
                // In case of error dispatch an FAILURE notice
                dispatch({
                    type: ChatConstants.SEND_MESSAGE_FAILURE,
                    error: error.toString()
                });
            }
        );
    };
}

export const ChatActions = {
    loadChatList,
    openDiscussion,
    sendMessage,
    stopAllLiveQueries,
    clearData
}