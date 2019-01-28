//builder pattern class

class modifyBalance {

	constructor(balance) {

		this.balance = balance;

	};

		makeDeposit(deposit) {


			if (parseInt(deposit) > 0) {

				this.balance += parseInt(deposit);
				return this

			}

		}

		makeWithdrawal(withdrawal) {

			if (parseInt(withdrawal) > 0 && this.balance >= parseInt(withdrawal)) {
				this.balance -= parseInt(withdrawal);
				return this
			}

		}
	


};



module.exports = modifyBalance;
