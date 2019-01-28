export const ACCOUNT = "ACCOUNT";

export const accountInfo = (accountData) => {

	return {
		type: ACCOUNT,
		accountData
	}
}