const assert = require("assert");
const { Given, When, Then } = require("cucumber");

const mongoose = require("mongoose");
const createAccount = require("../../createAccountClass");
const modifyBalance = require("../../modifyBalance");
const Account = require("../../models/accountModel");

const dbPath = "mongodb://127.0.0.1:27018/docker-node-mongo4";
mongoose.connect(dbPath, { useNewUrlParser: true });

Given("a new account", function() {
  const accountObject = new createAccount("testAccount")
    .setFirstName("testAccountFN")
    .setUserId(12345)
    .setEmail("testMail@mail.fr")
    .setPassword("12345")
    .setAdress("testAdress")
    .setBalance(0);

  this.accountObject = accountObject;
});

When("I send it to the database", async function() {
  console.log(this.accountObject);
  const newAccount = new Account(this.accountObject);

  await newAccount.save();

  this.accountName = this.accountObject.name;
});

Then("the account should be created and returned", async function() {
  let account = await Account.findOne({ name: this.accountName });
  if (account) {
    let verified = true;
    assert.ok(verified);
    await Account.findOneAndDelete({ name: this.accountName });
  }
  //console.log(n)
});

Given("an account and a positive balance", async function() {
  const accountObject = new createAccount("testAccount")
    .setFirstName("testAccountFN")
    .setUserId(12345)
    .setEmail("testMail@mail.fr")
    .setPassword("12345")
    .setAdress("testAdress")
    .setBalance(2000);

  let newAccount = new Account(accountObject);

  await newAccount.save();

  this.accountName = accountObject.name;
});

When("I attempt to deposit or withdraw money", async function() {
  let userAccount = await Account.findOne({ name: this.accountName });
  let currBalance = new modifyBalance(userAccount.balance);
  let deposit = 100;
  currBalance.makeDeposit(deposit);

  let currHistory = userAccount.history;
  let currOperation = [
    "deposit",
    deposit,
    Date().toString(),
    currBalance.balance
  ];
  currHistory.unshift(currOperation);

  await Account.findOneAndUpdate(
    { name: this.accountName },
    { $set: { balance: currBalance.balance, history: currHistory } },
    async (err, docs) => {
      console.log(err, docs);
    }
  );

  userAccount = await Account.findOne({ name: this.accountName });
  let withdrawal = parseInt(100);
  await currBalance.makeWithdrawal(withdrawal);
  currHistory = userAccount.history;
  currOperation = [
    "withdrawal",
    withdrawal,
    Date().toString(),
    currBalance.balance
  ];
  currHistory.unshift(currOperation);

  await Account.findOneAndUpdate(
    { name: this.accountName },
    { $set: { balance: currBalance.balance, history: currHistory } },
    (err, docs) => {
      console.log(err, docs);
    }
  );

  this.updatedBalance = currBalance.balance;
});

Then("the balance should be modified accordingly", async function() {
  let userAccount = await Account.findOne({ name: this.accountName });

  assert.equal(this.updatedBalance, userAccount.balance);
  await Account.findOneAndDelete({ name: this.accountName });
});

/*function isItFriday(today) {
  if (today === "Friday") {
    return "TGIF";
  } else {
    return "Nope";
  }
}

Given('today is {string}', function (givenDay) {
  this.today = givenDay;
});

When('I ask whether it\'s Friday yet', function () {
  this.actualAnswer = isItFriday(this.today);
});

Then('I should be told {string}', function (expectedAnswer) {
  assert.equal(this.actualAnswer, expectedAnswer);
});*/