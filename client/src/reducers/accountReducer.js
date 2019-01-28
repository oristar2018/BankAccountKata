import { ACCOUNT, accountInfo } from "../actions/accountAction";

export const accountReducer =  (state={accountData: null}, action ) => {
	switch(action.type) {

		case "ACCOUNT":
		return {...state, accountData: action.accountData}
		break;

		default:
		return state

	}

}