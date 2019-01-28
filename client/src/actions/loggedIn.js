export const LOGGED = "LOGGED";

export const logIn = (data) => {

	return {
		type: LOGGED,
		data
	}
}