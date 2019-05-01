import {
    ChatConstants
} from "../constants/chat.constants";

const initialState = {
    isLoadingChatList: false,
    isLoadingDiscussion: false,
    list: [],
    chats: {},
    users: {},
    messages: {},
    opened: ChatConstants.NO_CHAT_OPENED,
    liveQueries: [],
    chatsListener: null,
    usersListener: null,
}

function updateMessages(array, action) {
    return array.map((item, index) => {
        if (item.user._id !== action.discussion.user._id) {
            // This isn't the item we care about - keep it as-is
            return item
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...item,
            messages: action.messages
        }
    })
}

export const chat = (state = initialState, action) => {
    switch (action.type) {
        case ChatConstants.CLEAR_DATA:
            return {
                ...initialState
            }
        case ChatConstants.SET_CHATS:
            return {
                ...state,
                chats: action.chats
            }
        case ChatConstants.SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case ChatConstants.SET_MESSAGES:
            return {
                ...state,
                messages: action.messages,
            }
        case ChatConstants.SET_PARTNER_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.partnerID]: action.messages
                } 
                // state.messages.map(
                //     (content, idx) => (idx === action.partnerID) ? action.messages: content
                // )
                
                // _.findIndex(state.messages, action.partnerID)
                // state.messages
                // [
                //     ...state.messages,
                //     state.messages[action.partnerID]: action.messages
                // ],
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
        case ChatConstants.LOAD_LIST_REQUEST:
            return {
                ...state,
                isLoadingChatList: true
            }
        case ChatConstants.SET_DISCUSSIONS_LIST:
            return {
                ...state,
                isLoadingChatList: false,
                list: action.list
            }
        case ChatConstants.REFRESH_MESSAGES:
            return {
                ...state,
                isLoadingChatList: false,
                list: updateMessages(state.list, action),
                // opened: updateOpened(state.opened, action)
            }
        case ChatConstants.LOAD_LIST_FAILURE:
            return {
                ...state,
                isLoadingChatList: false
            }
        case ChatConstants.OPEN_DISCUSSION_SUCCESS:
            return {
                ...state,
                isLoadingDiscussion: false,
                // opened: state.list.findIndex((elt) => elt.user._id === action.id)
                opened: action.id
                // opened: _.first(_.reject(state.list, chat => chat.user._id !== action.id))
            }
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
        case ChatConstants.OPEN_DISCUSSION_REQUEST:
            return {
                ...state,
                isLoadingDiscussion: true
            }
        case ChatConstants.OPEN_DISCUSSION_FAILURE:
            return {
                ...state,
                isLoadingDiscussion: false
            }
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