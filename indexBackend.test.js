const createAccount = require("./createAccountClass");
const modifyBalance = require("./modifyBalance");


it('shouldTestAccountCreation', () => {


const mockObject = {

	name: "Morgan",
	firstName: "Freeman",
	email: "Morgan@morgan.com",
	adress: "6 Morgan Road, Morgan Town",
	balance: 0

};


expect("createMockAccount").toEqual(mockObject)



});




