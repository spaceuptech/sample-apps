![Browser snapshot](snapshots/space-chat-browser.png?raw=true "Space chat application")

# Getting started

## Clone repo
```shell
git clone https://github.com/spaceuptech/sample-apps.git
```

## Start space-cloud
You'd first have to download and setup [space-cloud](https://github.com/spaceuptech/space-cloud). The `config.yaml` is configured to reach a MongoDB instance on `localhost:27017`. 
If you want to use another instance, open `config.yaml` and edit the following line:
```yaml
# ...
conn: mongodb://localhost:27017
# ...
```
```shell
cd realtime-chat-react
/path/to/space-cloud.exe run --config ./space-cloud/config.yaml
```


## Start space-chat client
```shell
npm install
npm run start
```
Open [http://localhost:3000](http://localhost:3000) to see the chat client

# Data structure
## Database
Regarding data storage, Space-Cloud is configured to use 3 collections
### 📗 users
#### structure of documents
```js
{
    _id : String, // ID of the user
    role : String, // role
    email : String, // email
    pass : String, // Password
    name : String, // Username
    lastActiveTime : Number, // Last active time (timestamp)
    isActive : Boolean // Tells if user is currently active
}
```
### 📗 chat
#### structure of documents
```js
{
    _id : String, // ID of the chat
    to : String, // ID of user 1
    from : String, // ID of user 2
    creation : String // creation date (UTC)
}
```
### 📗 messages
#### structure of documents
```js
{
    _id : String, // ID of the message
    text : String, // Content of the message
    read : Boolean, // tells if partner has read message
    chat_id : String, // ID of the chat this message is in
    from : String, // ID of the user who sent this message
    time : String // creation date (UTC)
}
```

## Application data
All the application is based on redux framework and a store made of two reducers.
- user : all content related to active logged user
- chat : all chats / users / messages data

These two states are updated based on action type in respective reducers.

In a more concrete way, here's how data is loaded in chat:
- Launch chats and users listeners(with associated callbacks)
- Each time a callback is triggered, it will dispatch `ADD_USER` or `ADD_CHAT` to update `store.chat` value.

> N.B. When new chats listener is triggered, it will start a new livequery to observe incoming messages.

# Code walkaround
## Frameworks
In order to develop this app, the following libs/frameworks have been used:
- [react](https://www.npmjs.com/package/react)
- [redux](https://www.npmjs.com/package/redux)
- [@material-ui](https://www.npmjs.com/package/@material-ui)

## Directories
### 📂 actions
Split between `chat`, `notifications` and `user`, this directory modules are in charge of handling all actions out of UI components. Each action may call a service to proceed to async data retrieval.
> All Space-Cloud outputs are handled in this place.

### 📂 assets
Icons / images used by the app.

### 📂 components
UI components organized in high level modules (`Chat`, `ChatList`, `UserDirectoryDialog`...).
> Components are connected to redux store to map application data and dynamically bind any update.

### 📂 constants
The constants defined in this directory's modules are used to dispatch typed actions to reducers. They are splitted between `chat` and `user`, and contain all the actions that may be triggered by action handlers.

### 📂 helpers
Helpers directory contains redux store initializer and an history helper. This place may be useful to add an auth-header helper for example.

### 📂 pages
Higher level wrapping components (`Chat page` and `Login or register page`).

### 📂 reducers
The reducers used to update store, splitted between `chat` and `user`.

### 📂 services
This is probably the place you will want to have a look first has it handles all `Space Cloud` logic !

#### Chat service
- Fetch messages / users / chats 
- Realtime listen to new messages / users / chats

#### User service
- Sign in
- Sign up
- Logout

## User Interface
### Chat (logged user)
```js
ChatPage
|---NavBar // Top bar with logout 
|---ChatSearch // Search form
|---ChatList // List of chats
|   |---ChatListItem // As many as there are chats
|---Chat
    |---ChatHeader // Header with partner name
    |---ChatDiscussion // Chat messages
    |---ChatSend // Send form
```
### Login/Register (guest)
```js
LoginRegisterPage
|---LoginForm
|---RegisterForm
```

# Author
This sample chat app has been developed by [8byr0](https://github.com/8byr0).

# Licence
APACHE 2.0 [view details](https://github.com/spaceuptech/sample-apps/blob/master/LICENSE)
