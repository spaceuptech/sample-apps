import {
    ChatService
} from "../services/ChatService";
import {
    ChatConstants
} from "../constants/chat.constants";
import * as _ from 'lodash'


const loadChatList = () => {
    return dispatch => {
        dispatch(request());

        ChatService.getChatsList().subscribe(
            list => {
                dispatch(success(list));
                list.forEach((elt) => {

                    const onMessages = (docs, type) => {
                        // Clear the existing todos
                        const messages = _.reject(docs, message => ((message.to !== elt.user._id) && (message.from !== elt.user._id)))
                        if (messages.length > 0) {
                            // console.log("Incoming messages for user ", elt.user._id, messages)
                            dispatch(setDiscussionMessages(elt, messages))
                        }

                    }
                    const onError = (err) => {
                        console.log('Operation failed:', err)
                    }
                    ChatService.startMessagesRealtime(elt.user._id, onMessages, onError)
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
    sendMessage
}