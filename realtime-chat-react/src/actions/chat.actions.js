import {
    ChatService
} from "../services/ChatService";
import {
    ChatConstants
} from "../constants/chat.constants";
import {
    store
} from "../helpers/store";
// import * as _ from 'lodash'

const stopAllLiveQueries = () => {
    return dispatch => {
        store.getState().chat.liveQueries.forEach(liveQuery => {
            liveQuery()
            dispatch({
                type: ChatConstants.REMOVE_LIVE_QUERY,
                liveQuery
            })
        })
    }
}

const loadChatList = () => {
    return dispatch => {
        dispatch(request());
        // const user = store.getState().user.user;

        ChatService.getChatsList().subscribe(
            list => {
                dispatch(success(list));
                list.forEach((elt) => {

                    const onMessages = (docs, type) => {
                        // TODO 8byr0 compare incoming list with existing to append only new messages

                        if (docs.length > 0) {
                            dispatch(setDiscussionMessages(elt, docs))
                        }

                    }
                    const onError = (err) => {
                        console.log('Operation failed:', err)
                    }
                    const currentLiveQuery = ChatService.startMessagesRealtime(elt.user._id, onMessages, onError).subscribe(onMessages, onError)

                    dispatch({
                        type: ChatConstants.SAVE_LIVE_QUERY,
                        liveQuery: currentLiveQuery
                    })
                })
            },
            (error) => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function request() {
        return {
            type: ChatConstants.LOAD_LIST_REQUEST
        }
    }

    function success(list) {
        return {
            type: ChatConstants.LOAD_LIST_SUCCESS,
            list
        }
    }

    function failure(error) {
        return {
            type: ChatConstants.LOAD_LIST_FAILURE,
            error
        }
    }
}


const setDiscussionMessages = (discussion, messages) => {
    return {
        type: ChatConstants.REFRESH_MESSAGES,
        discussion: discussion,
        messages: messages
    }
}
const openDiscussion = (chatData) => {
    return dispatch => {
        dispatch(request());
        dispatch(success(chatData.user._id));
    };

    function request() {
        return {
            type: ChatConstants.OPEN_DISCUSSION_REQUEST
        }
    }

    function success(id) {
        return {
            type: ChatConstants.OPEN_DISCUSSION_SUCCESS,
            id
        }
    }

    // function failure(error) {
    //     return {
    //         type: ChatConstants.OPEN_DISCUSSION_FAILURE,
    //         error
    //     }
    // }
}
const sendMessage = (id, text) => {
    return dispatch => {
        dispatch(request());

        ChatService.sendMessage(id, text).subscribe(
            list => {
                dispatch(success(list));
            },
            (error) => {
                dispatch(failure(error.toString()));
            }
        );
    };

    function request() {
        return {
            type: ChatConstants.SEND_MESSAGE_REQUEST
        }
    }

    function success(message) {
        return {
            type: ChatConstants.SEND_MESSAGE_SUCCESS
        }
    }

    function failure(error) {
        return {
            type: ChatConstants.SEND_MESSAGE_FAILURE,
            error
        }
    }
}

export const ChatActions = {
    loadChatList,
    openDiscussion,
    sendMessage,
    stopAllLiveQueries
}