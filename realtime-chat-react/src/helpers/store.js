import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { userConstants } from '../constants/user.constants';

const loggerMiddleware = createLogger({
    predicate: (getState, action) => action.type !== userConstants.UPDATE_LAST_ACTIVE_TIME
});

// if you want to debug redux and see which actions are triggered, set to true 
const enableLogger = false;

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

