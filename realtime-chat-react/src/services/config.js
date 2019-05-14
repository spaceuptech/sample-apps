import { API} from "space-api";


// Initialize api with the project name and url of the space cloud
const api = new API('chat-app', 'http://localhost:8080');

// Initialize database(s) you intend to use
const db = api.Mongo();

const generateId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}



export const config = {
    api,
    db,
    generateId
}