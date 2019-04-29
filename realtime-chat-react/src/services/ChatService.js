import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs';
import { store } from '../helpers/store';
import { and, or, cond } from "space-api";
import * as _ from 'lodash'
import { config } from './config';


const sendMessage = (partnerID, text) => {
    // Get the input field values
    return Observable.create((observer) => {
        const user = store.getState().user.user;

        // Add todo to the database
        config.db.insert("messages")
            .one({ _id: config.generateId(), text: text, read: false, to: partnerID, from: user._id, time: new Date() })
            .then(res => {
                // Verify if get request is successful
                if (res.status !== 200) {
                    console.log("Error occurred")
                    return;
                }
                observer.next(res)
            });
    })
}

const getUsers = () => {
    return Observable.create((observer) => {
        config.db.profiles().then(res => {
            if (res.status === 200) {
                observer.next(res.data.users)
                return;
            }
        }).catch(ex => {
            // Exception occured while processing request
        });

    });
}

const getChats = (userID) => {
    return Observable.create((observer) => {
        const condition = or(
            cond("from", "==", userID),
            cond("to", "==", userID),
            cond("to", "==", "ALL")
        );

        config.db.get("chats").where(condition).apply().then(res => {
            if (res.status === 200) {
console.log(res)
                observer.next(res.data.result);
                return;
            }
        })
            .catch(ex => {
                // Exception occured while processing request
            });

    });
}

const startMessagesRealtime = (partnerID, onMessages, onError) => {
    const user = store.getState().user.user;
    const condition = or(
        and(cond("to", "==", user._id), cond("from", "==", partnerID)),
        and(cond("to", "==", partnerID), cond("from", "==", user._id))
    )
    const allCondition = cond("to", "==", partnerID)
    return config.db.liveQuery("messages").where(
        (partnerID.toString().localeCompare("ALL") === 0) ? allCondition : condition
    )
}

const getChatsList = () => {

    return Observable.create((observer) => {
        const activeUser = store.getState().user.user;

        let userID = activeUser._id
        const fetchChats$ = getChats(userID)
        const fetchUsers$ = getUsers(userID)

        const combined = combineLatest(fetchUsers$, fetchChats$);
        combined.subscribe(
            ([users, existingChats]) => {
                let chats = {}
                chats["ALL"] = {
                    user: { name: "ALL", _id: "ALL" },
                    messages: [

                    ]
                }
                users.forEach(user => {
                    if (!chats[user._id]) {
                        chats[user._id] = {
                            user: user,
                            messages: [

                            ]
                        }
                    }
                });

                // TODO
                // chats = _.reject(chats, chat => chat.messages.length === 0)
                chats = _.reject(chats, chat => chat.user._id === activeUser._id)

                observer.next(_.values(chats))
            })

    });
}



export const ChatService = {
    getChatsList,
    sendMessage,
    startMessagesRealtime
}