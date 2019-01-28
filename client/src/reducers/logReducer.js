import { LOGGED, logIn } from "../actions/loggedIn";



export const logReducer = ( state={logged: false}, action ) => {
	switch(action.type) {

		case "LOGGED":
		return {...state, logged: action.data}
		break;

		default:
		return state
	}
}