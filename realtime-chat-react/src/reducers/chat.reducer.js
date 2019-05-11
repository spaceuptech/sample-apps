/**
 * chat.reducer.js is in charge of initializing store.state.chat 
 * and updating values when chat constants are dispatched.
 * 
 * @author 8byr0 <https://github.com/8byr0>
 */

import { ChatConstants } from "../constants/chat.constants";


const initialState = {
    isLoadingChatList: false,
    isLoadingDiscussion: false,
    chats: [{ _id: 'ALL', to: 'ALL' }],
    users: {},
    messages: {ALL: []},
    opened: ChatConstants.NO_CHAT_OPENED,
    liveQueries: [],
    chatsListener: null,
    usersListener: null,
}


export const chat = (state = initialState, action) => {
    switch (action.type) {
        // Reset to initial state
        case ChatConstants.CLEAR_DATA:
            return {
                ...initialState
            }
        // Add a new chat to the list of active user's
        case ChatConstants.ADD_CHAT:
            return {
                ...state,
                chats: [
                    ...state.chats,
                    action.chat
                ]
            }
        // Add a new user to directory
        case ChatConstants.ADD_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.user._id]: action.user
                }
            }
        // When a new chat has been properly created
        case ChatConstants.START_CHAT_SUCCESS:
            return {
                ...state,
                chats: [
                    ...state.chats,
                    action.chat
                ]
            }
        // Instantiate messages of chatID to empty list
        case ChatConstants.CREATE_MESSAGES_LIST_IF_NOT_EXIST:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.chatID]: state.messages[action.chatID] || []
                }
            }
        // Set the messages of a chat
        case ChatConstants.SET_CHAT_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.chatID]: action.messages
                }
            }
        // Identified listeners stored to be destroyed on leave
        case ChatConstants.SET_INCOMING_CHATS_LISTENER:
            return {
                ...state,
                chatsListener: action.listener
            }
        case ChatConstants.REMOVE_INCOMING_CHATS_LISTENER:
            return {
                ...state,
                chatsListener: null
            }
        case ChatConstants.SET_INCOMING_USERS_LISTENER:
            return {
                ...state,
                usersListener: action.listener
            }
        case ChatConstants.REMOVE_INCOMING_USERS_LISTENER:
            return {
                ...state,
                usersListener: null
            }
        // Live queries management
        case ChatConstants.SAVE_LIVE_QUERY:
            return {
                ...state,
                liveQueries: [...state.liveQueries, action.liveQuery]

            }
        case ChatConstants.REMOVE_LIVE_QUERY:
            return {
                ...state,
                liveQueries: state.liveQueries.filter(lq => lq !== action.liveQuery)
            }
        // Open chat flow
        case ChatConstants.OPEN_CHAT_REQUEST:
            return {
                ...state,
                isLoadingDiscussion: true
            }
        case ChatConstants.OPEN_CHAT_SUCCESS:
            return {
                ...state,
                isLoadingDiscussion: false,
                opened: action.id
            }
        // Send messagesflow
        case ChatConstants.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                isSendingMessage: false,
            }
        case ChatConstants.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                isSendingMessage: true
            }
        case ChatConstants.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                isSendingMessage: false
            }
        default:
            return state
    }
}