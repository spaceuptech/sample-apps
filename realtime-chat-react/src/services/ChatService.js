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

const getMessages = () => {
    const user = store.getState().user.user;

    return Observable.create((observer) => {
        const condition = or(cond("to", "==", user._id), cond("from", "==", user._id));

        config.db.get("messages").where(condition).apply().then(res => {
            if (res.status === 200) {
                let messages = {}

                res.data.result.forEach((elt) => {
                    const key = (elt.from === user._id) ? elt.to : elt.from
                    if (!messages[key]) {
                        messages[key] = []
                    }
                    messages[key].push(elt)
                })
                messages["ALL"] = []

                observer.next(messages);
                return;
            }
        });
    });
}

const getUsers = () => {
    const user = store.getState().user.user;

    return Observable.create((observer) => {
        const condition = cond("_id", "!=", user._id);

        config.db.get("users").where(condition).apply().then(res => {
            if (res.status === 200) {
                let users = convertRawUsersToHasedObject(res.data.result)

                observer.next(users);
                return;
            }
        });
    });
}

const convertRawUsersToHasedObject = (rawUsers) => {
    let users = {}
    rawUsers.forEach((elt) => {
        users[elt._id] = elt
    })
    users["ALL"] = { _id: "ALL", name: 'ALL' }
    return users;
}

const getChats = (localUserID) => {
    const user = store.getState().user.user;

    return Observable.create((observer) => {
        const condition = or(
            cond("from", "==", user._id),
            cond("to", "==", user._id),
            cond("to", "==", "ALL")
        );

        config.db.get("chats").where(condition).apply().then(res => {
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

const startMessagesRealtime = (partnerID) => {
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

const startUsersRealtime = () => {
    return config.db.liveQuery("users");
}

const startChatsRealtime = () => {
    const user = store.getState().user.user;
    const condition = or(
        and(cond("to", "==", user._id)),
    )

    return config.db.liveQuery("chats").where(
        condition
    )
}


const getChatsList = () => {

    return Observable.create((observer) => {
        const activeUser = store.getState().user.user;

        let userID = activeUser._id
        const fetchUsers$ = getUsers(userID)
        const fetchChats$ = getChats(userID)

        const combined = combineLatest(fetchUsers$, fetchChats$);
        combined.subscribe(
            ([users, existingChats]) => {
                let chats = {}
                // chats["ALL"] = {
                //     user: { name: "ALL", _id: "ALL" },
                //     messages: [

                //     ]
                // }
                console.log(existingChats)
                existingChats.forEach(chat => {
                    if (chat.to !== 'ALL') {
                        const partner = (chat.to === userID) ? chat.from : chat.to
                        if (!chats[partner]) {
                            chats[partner] = {
                                user: _.first(users.filter((usr) => usr._id === partner)),
                                messages: [

                                ]
                            }
                        }
                    } else {
                        chats["ALL"] = {
                            user: { name: "ALL", _id: "ALL" },
                            messages: [

                            ]
                        }
                    }
                })

                // TODO
                // chats = _.reject(chats, chat => chat.messages.length === 0)
                // chats = _.reject(chats, chat => chat.user._id === activeUser._id)

                observer.next(_.values(chats))
            })

    });
}



export const ChatService = {
    getChats,
    getUsers,
    getMessages,
    getChatsList,
    sendMessage,
    startMessagesRealtime,
    startChatsRealtime,
    startUsersRealtime
}