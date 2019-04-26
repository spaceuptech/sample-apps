import { combineReducers } from 'redux';

import { user } from './user.reducer';
import { chat } from './chat.reducer';


const rootReducer = combineReducers({
    user,
    chat,
});

export default rootReducer;