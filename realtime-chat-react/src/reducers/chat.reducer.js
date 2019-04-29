import {
    ChatConstants
} from "../constants/chat.constants";

const initialState = {
    isLoadingChatList: false,
    isLoadingDiscussion: false,
    list: [],
    opened: ChatConstants.NO_CHAT_OPENED,
    liveQueries: []
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
        case ChatConstants.LOAD_LIST_REQUEST:
            return {
                ...state,
                isLoadingChatList: true
            }
        case ChatConstants.LOAD_LIST_SUCCESS:
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
                opened: state.list.findIndex((elt) => elt.user._id === action.id)
                // opened: action.id
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