import { store } from '../helpers/store';
import { and, or, cond } from "space-api";
import { config } from './config';


const sendMessage = (partnerID, text) => {
    return new Promise((resolve, reject) => {
        const user = store.getState().user.user;

        config.db.insert("messages")
            .one({ _id: config.generateId(), text: text, read: false, to: partnerID, from: user._id, time: new Date() })
            .then(res => {
                // Verify if get request is successful
                if (res.status !== 200) {
                    reject("User not allowed to sign in");
                }
                resolve(res);
            }).catch((error) => {
                reject(error);
            });
    });
}

const getMessages = () => {
    return new Promise((resolve, reject) => {
        const user = store.getState().user.user;

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

                resolve(messages);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        const user = store.getState().user.user;
        const condition = cond("_id", "!=", user._id);

        config.db.get("users").where(condition).apply().then(res => {
            if (res.status === 200) {
                let users = convertRawUsersToHasedObject(res.data.result)

                resolve(users);
            }
        }).catch((err) => {
            reject(err)
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

const getChats = () => {
    return new Promise((resolve, reject) => {
        const user = store.getState().user.user;

        const condition = or(
            cond("from", "==", user._id),
            cond("to", "==", user._id),
            cond("to", "==", "ALL")
        );

        config.db.get("chats").where(condition).apply().then((res) => {
            if (res.status === 200) {
                resolve(res.data.result);
            }
        }).catch((err) => {
            reject(err);
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

export const ChatService = {
    getChats,
    getUsers,
    getMessages,
    // getChatsList,
    sendMessage,
    startMessagesRealtime,
    startChatsRealtime,
    startUsersRealtime
}