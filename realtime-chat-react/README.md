# Getting started

## Clone repo
```shell
git clone https://github.com/spaceuptech/sample-apps.git
```

## Start space-cloud
`config.yaml` is configured to reach a MongoDB instance on `localhost:27017`. 
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

# Walkaround
In order to develop this app, the following libs/frameworks have been used:
- [react](https://www.npmjs.com/package/react)
- [redux](https://www.npmjs.com/package/redux)
- [@material-ui](https://www.npmjs.com/package/@material-ui)

## Directories
### 📂 actions
Split between `chat`, `notifications` and `user`, this directory modules are in charge of handling all actions out of UI components. Each action may call a service to proceed to async data retrieval.


### 📂 assets
Icons / images used by the app.

### 📂 components
UI components organized in high level modules (`Chat`, `ChatList`, `UserDirectoryDialog`...).

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


# Author
This sample chat app has been developed by [8byr0](https://github.com/8byr0).

# Licence
APACHE 2.0 [view details](https://github.com/spaceuptech/sample-apps/blob/master/LICENSE)
