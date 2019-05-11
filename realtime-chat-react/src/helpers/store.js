import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { userConstants } from '../constants/user.constants';
import { ChatConstants } from '../constants/chat.constants';

const loggerMiddleware = createLogger({
    predicate: (getState, action) => action.type !== userConstants.UPDATE_LAST_ACTIVE_TIME && action.type !== ChatConstants.SET_USERS
});

// if you want to debug redux and see which actions are triggered, set to true 
const enableLogger = true;

let middlewares = enableLogger ?
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ) :
    applyMiddleware(
        thunkMiddleware
    )

export const store = createStore(
    rootReducer,
    middlewares
);

