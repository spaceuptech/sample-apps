import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();

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

