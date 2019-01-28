import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import combineReducers from "./reducers/combineReducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Connected } from "./App";
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(combineReducers);


ReactDOM.render(<Provider store={store}><Connected /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
