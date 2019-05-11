import { store } from '../helpers/store';
import { or, cond } from "space-api";
import { config } from './config';

const convertRawUsersToHasedObject = (rawUsers) => {
    let users = {}
    rawUsers.forEach((elt) => {
        users[elt._id] = elt
    })
    users["ALL"] = { _id: "ALL", name: 'ALL' }
    return users;
}

////////////
// CREATE //
////////////

const createChat = (partnerID) => {
    return new Promise((resolve, reject) => {
        const user = store.getState().user.user;
        const chat = { _id: config.generateId(), to: partnerID, from: user._id, creation: new Date() }
        config.db.insert("chats")
            .one(chat)
            .then(res => {
                resolve(chat);
            }).catch((error) => {
                reject(error);
            });
    });
}

const sendMessage = (discussionID, text) => {
    return new Promise((resolve, reject) => {
        const user = store.getState().user.user;

        config.db.insert("messages")
            .one({
                _id: config.generateId(),
                text: text,
                read: false,
                discussion_id: discussionID,
                from: user._id,
                time: new Date()
            })
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

/**
 * Update user object in space-cloud
 * @param {Object} user new user
 */
function updateMessage(message) {
    return new Promise((resolve, reject) => {
        config.db.updateOne('messages').where(cond('_id', '==', message._id))
            .set(message).apply().then(res => (resolve(res))).catch(err => { throw err });
    });
}
/////////////////
//   READ ALL  //
/////////////////
const getMessages = () => {
    return new Promise((resolve, reject) => {
        const user = store.getState().user.user;

        const condition = or(cond("to", "==", user._id), cond("from", "==", user._id));

        config.db.get("messages").where(condition).apply().then(res => {
            if (res.status === 200) {
                let messages = {}

                res.data.result.forEach((elt) => {
                    // const key = (elt.from === user._id) ? elt.to : elt.from
                    const key = elt.discussion_id
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

///////////////////////////////
//     REALTIME TRIGGERS     //
///////////////////////////////

const startMessagesRealtime = (discussionID) => {
    const condition = cond("discussion_id", "==", discussionID)
    // const condition = or(
    //     and(cond("to", "==", user._id), cond("from", "==", partnerID)),
    //     and(cond("to", "==", discussionID), cond("from", "==", user._id))
    // )
    // const allCondition = cond("to", "==", partnerID)
    return config.db.liveQuery("messages")
        .where(
            // (partnerID.toString().localeCompare("ALL") === 0) ? allCondition : condition
            condition
        )
}



const startUsersRealtime = () => {
    return config.db.liveQuery("users");
}

const startChatsRealtime = () => {
    const user = store.getState().user.user;
    const condition = or(
        or(cond("to", "==", user._id), cond('from', '==', user._id), cond('to', '==', 'ALL')),
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
    startUsersRealtime,
    createChat,
    updateMessage
}