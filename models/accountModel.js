const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const newAccount = new Schema({
	name: {
		type: String,
		required: true
	},

	firstName: {
		type: String,
		required: true
	},

	userId: {
		type: Number,
		required: true
	},

	email: {
		type: String,
		default: ""
	},

	password: {
		type: String,
		required: true
	},

	adress: {
		type: String,
		default: ""
	},

	balance: {
		type: Number,
		default: 0
	},

	history: {
		type: Array,
		default: []

	}
});

newAccount.pre('save', async function(next) {
	console.log(this.password)
	try {

		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(this.password, salt);
		this.password = passwordHash;
		next();
	}

	catch(error) {
		next(error);
	}
});

newAccount.methods.isPasswordValid = async function(newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password); 
	}

	catch(error) {
		throw new Error(error)
	}
}






const Account = mongoose.model("account", newAccount);

module.exports = Account;