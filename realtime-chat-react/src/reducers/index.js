import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { chat } from './chat.reducer';
import notifyReducer from 'react-redux-notify';


const rootReducer = combineReducers({
    user,
    chat,
    notifications: notifyReducer 
});

export default rootReducer;