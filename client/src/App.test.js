/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';*/
//import combineReducers from "./reducers/combineReducers";
//import { createStore } from "redux";
//import { Provider } from "react-redux";
//import { Connected } from "./App";
//import App from './App';
//import * as serviceWorker from './serviceWorker';
//import { createAccount } from "./createAccountClass";
const createAccount = require("./createAccountTest");
//const store = createStore(combineReducers);

/*it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<Provider store={store}><Connected /></Provider>, div);
	ReactDOM.unmountComponentAtNode(div);
});*/

it("testsAccountInfo", async () => {
	var res;
	const mockAccountInfo = new Promise((resolve, reject) => {
		const test = new createAccount("testName")
			.setFirstName("testFirstName")
			.setBalance(0);

		resolve(test);
	});

	await mockAccountInfo.then(response => {
		res = response;
	});

	expect(res.hasOwnProperty("firstName")).toBe(true);
	expect(res.hasOwnProperty("userId")).toBe(true);
	expect(res.hasOwnProperty("email")).toBe(true);
	expect(res.hasOwnProperty("password")).toBe(true);
	expect(res.hasOwnProperty("adress")).toBe(true);
	expect(res.hasOwnProperty("balance")).toBe(true);
});