import { ChatConstants } from "../constants/chat.constants";


const initialState = {
    isLoadingChatList: false,
    isLoadingDiscussion: false,
    list: [],
    chats: [],
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
        case ChatConstants.ADD_CHAT:
            return {
                ...state,
                chats: [
                    ...state.chats,
                    action.chat
                ]
            }
        case ChatConstants.ADD_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.user._id]: action.user
                }
            }
        case ChatConstants.START_CHAT_SUCCESS:
            return {
                ...state,
                chats: [
                    ...state.chats,
                    action.chat
                ]
            }
        case ChatConstants.CREATE_MESSAGES_LIST_IF_NOT_EXIST:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.chatID]: state.messages[action.chatID] || []
                }
            }
        case ChatConstants.SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case ChatConstants.SET_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    ...action.messages
                    // ...()=>{

                    //     action.messages.filter((set, idx) => !!!Object.keys(state.messages).includes(idx))

                    // }
                }
            }
        case ChatConstants.SET_DISCUSSION_MESSAGES:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.discussionID]: action.messages
                }
            }
        case ChatConstants.SET_INCOMING_DISCUSSIONS_LISTENER:
            return {
                ...state,
                discussionsListener: action.listener
            }
        case ChatConstants.REMOVE_INCOMING_DISCUSSIONS_LISTENER:
            return {
                ...state,
                discussionsListener: null
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
                opened: action.id
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