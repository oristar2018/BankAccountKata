//builder pattern class

class createAccount {
	constructor(name) {
		(this.name = name),
			(this.firstName = undefined),
			(this.userId = undefined),
			(this.email = undefined),
			(this.password = undefined),
			(this.adress = undefined),
			(this.balance = undefined),
			(this.history = undefined);
	}

	setFirstName(firstName) {
		this.firstName = firstName;
		return this;
	}

	setUserId(userId) {
		this.userId = userId;
		return this;
	}

	setEmail(email) {
		this.email = email;
		return this;
	}

	setPassword(password) {
		this.password = password;
		return this;
	}

	setAdress(adress) {
		this.adress = adress;
		return this;
	}

	setBalance(balance) {
		this.balance = balance;
		return this;
	}

	setHistory(history) {
		this.history = history;
		return this;
	}
}

module.exports = createAccount;