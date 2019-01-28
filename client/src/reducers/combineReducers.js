import { combineReducers } from 'redux';
import { logReducer } from "./logReducer";
import { accountReducer } from "./accountReducer";

export default combineReducers({logReducer, accountReducer});