import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs';
import { store } from '../helpers/store';
import { and, or, cond } from "space-api";
import * as _ from 'lodash'
import { config } from './config';


const sendMessage = (partnerID, text) => {
    console.log("send messag", partnerID)
    // Get the input field values
    return Observable.create((observer) => {
        const user = store.getState().user.user;

        // Add todo to the database
        config.db.insert("messages")
            .one({ _id: config.generateId(), text: text, read: false, to: partnerID, from: user._id })
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

const getUserMessages = (userID) => {
    return Observable.create((observer) => {

        const condition = or(cond("from", "==", userID), cond("to", "==", userID));

        config.db.get("messages").where(condition).apply().then(res => {
            if (res.status === 200) {

                observer.next(res.data.result);
                return;
            }
        })
            .catch(ex => {
                // Exception occured while processing request
            });

    });
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
let done = false
const startMessagesRealtime = (partnerID, onMessages, onError) => {
    const user = store.getState().user.user;
    let first = _.cloneDeep(config.db.liveQuery("messages"));

    // console.log(user)
    config.db.liveQuery("messages").where(
            or(
                and(cond("to", "==", user._id), cond("from", "==", partnerID)),
                and(cond("to", "==", partnerID), cond("from", "==", user._id))
            )
        )
        .subscribe(onMessages, onError)
    // if (!done) {
    //     const user = store.getState().user.user;

    //     let first = _.cloneDeep(config.db.liveQuery("messages"));
    //         first.where(
    //             and(cond("to", "==", user._id), cond("from", "==", "0c24b0e3-6651-11e9-a65a-18dbf207aef7")),
    //             // and(cond("to", "==", "1"), cond("from", "==", "2")),

    //         )
    //         .subscribe((docs, type) => {
    //             // console.log("STANDALONE docs", docs)
    //         }, onError)

    //     config.db.liveQuery("messages")
    //         .where(
    //             and(cond("to", "==", user._id), cond("from", "==", "0c24b0e3-6651-11e9-a65a-18dbf207aef7")),

    //         )
    //         .subscribe((docs, type) => {
    //             // console.log("STANDALONE docs", docs)
    //         }, onError)
    //     done = true
    // }
}

const getChatsList = () => {

    return Observable.create((observer) => {
        const activeUser = store.getState().user.user;

        let userID = activeUser._id
        const fetchUsers$ = getUsers()
        const fetchMessages$ = getUserMessages(userID);

        const combined = combineLatest(fetchUsers$, fetchMessages$);
        combined.subscribe(
            ([users, messages]) => {
                let chats = {}
                users.forEach(user => {
                    if (!chats[user._id]) {
                        chats[user._id] = {
                            user: user,
                            messages: [

                            ]
                        }
                    }
                });
                messages.forEach(message => {
                    if (userID === message.to) {
                        if (chats[message.from]) {
                            chats[message.from].messages.push(message)
                        }
                    }
                    else if (userID === message.from) {
                        if (chats[message.to]) {
                            chats[message.to].messages.push(message)
                        }
                    }
                })
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