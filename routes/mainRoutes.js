const express = require("express");
const router = require("express-promise-router")();
const mongoose = require("mongoose");
const createAccount = require("../createAccountClass");
const modifyBalance = require("../modifyBalance");
const { signUp, signIn } = require("../Controllers/userControllers");
const passport = require("passport");
const passportConf = require("../passport/passportConf");
const Account = require("../models/accountModel");

router.route("/signup").post(signUp);

router.route("/signin").get((req, res, next) => {
  //console.log('works')
  if (req.user) {
    var user = req.user;
    console.log(user, user.name);
    var userObject = new createAccount(user.name)
      .setFirstName(user.firstName)
      .setBalance(user.balance)
      .setHistory(user.history);
    console.log(userObject);
    const response = { userObject, logged: "yes" };
    res.json(response);
  } else {
    res.json("no");
  }
});

router.route("/delete").post(
  (req, res, next) => {
    if (req.headers.test === "yes") {
      //res.redirect('http://localhost:3000')
      req.body.name = req.headers.name;
      setTimeout(() => {
        next();
      }, 4500);
      console.log(req.body);
    } else {
      req.body.name = req.headers.name;
      next();
    }
  },

  async (req, res, next) => {
    var accountName = req.body.name;
    console.log(accountName, "aN");
    let deletedAccount = await Account.findOneAndDelete({ name: accountName });
    console.log(deletedAccount);
    if (deletedAccount) {
      let deletedText = "deleted";

      res.json(deletedText);
    } else {
      res.json("failed");
    }
  }
);

router.route("/signin").post(
  /*async (req, res, next) => {
    if (req.headers.test === "yes") {
      //res.redirect('http://localhost:3000')
      req.body.username = req.headers.username;
      req.body.password = req.headers.password
       console.log(req.body, "headers");
       await setTimeout(() => {console.log("delay"); next()}, 2000);
       
    }

    else {
      console.log(req.body);
      next();
    }
   
  },*/
  passport.authenticate("local", { session: true }),
  signIn
);

router.route("/signinTest").post(
  async (req, res, next) => {
    if (req.headers.test === "yes") {
      //res.redirect('http://localhost:3000')
      req.body.username = req.headers.username;
      req.body.password = req.headers.password;
      console.log(req.body, "headers");
      await setTimeout(() => {
        console.log("delay");
        next();
      }, 2000);
    } else {
      console.log(req.body);
      next();
    }
  },
  passport.authenticate("local", { session: false }),
  signIn
);

router.route("/logout").get(
  async (req, res, next) => {
    console.log("test log out", req.headers);
    if (req.headers.test === "yes") {
      await setTimeout(() => {
        console.log("delay");
        next();
      }, 0);
    } else {
      next();
    }
  },

  (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.json("logged out");
  }
);

router.route("/balance").post(async (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    var userAccount = req.user;
    /*await Account.findOne({userId: req.user.userId}, (err, docs) => {
    userAccount = docs;
    return docs})*/

    //console.log(userAccount, 'account')
    if (req.body.deposit && req.body.deposit > 0) {
      let currBalance = new modifyBalance(userAccount.balance);
      let deposit = parseInt(req.body.deposit);
      currBalance.makeDeposit(deposit);

      let currHistory = userAccount.history;
      let currOperation = [
        "deposit",
        deposit,
        Date().toString(),
        currBalance.balance
      ];
      currHistory.unshift(currOperation);

      Account.findOneAndUpdate(
        { userId: req.user.userId },
        { $set: { balance: currBalance.balance, history: currHistory } },
        async (err, docs) => {
          console.log(err, docs);
          res.render("redirect1");
        }
      );
    }

    if (req.body.withdraw && req.body.withdraw > 0) {
      let currBalance = new modifyBalance(userAccount.balance);
      let withdrawal = parseInt(req.body.withdraw);
      currBalance.makeWithdrawal(withdrawal);

      let currHistory = userAccount.history;
      let currOperation = [
        "withdrawal",
        withdrawal,
        Date().toString(),
        currBalance.balance
      ];
      currHistory.unshift(currOperation);
      //if (withdraw > 0 && currBalance > 0 && (currBalance >= withdraw)) { newBalance = currBalance - withdraw}
      Account.findOneAndUpdate(
        { userId: req.user.userId },
        { $set: { balance: currBalance.balance, history: currHistory } },
        (err, docs) => {
          console.log(err, docs);
          res.render("redirect1");
        }
      );
    }
  }
});

module.exports = router;