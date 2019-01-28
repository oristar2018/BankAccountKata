const Account = require("../models/accountModel");
const createAccount = require("../createAccountClass");

module.exports = {
  signUp: async (req, res, next) => {
    console.log("signUp route", req.body, req.headers);
    const userFound = await Account.findOne({
      userId: req.body.userId
    });
    if (userFound) {
      res.json("user exists");
    } else {
      var defaultHistory = [[
        "deposit",
        500,
        Date().toString(),
        500
      ]];

      var AccountObject = new createAccount(req.body.name)
        .setFirstName(req.body.firstName)
        .setUserId(req.body.userId)
        .setEmail(req.body.email)
        .setPassword(req.body.password)
        .setAdress(req.body.adress)
        .setBalance(500)
        .setHistory(defaultHistory);
      if (req.headers.test === "yes") {
        AccountObject = new createAccount(req.headers.name)
          .setFirstName(req.headers.firstname)
          .setUserId(req.headers.userid)
          .setEmail(req.headers.email)
          .setPassword(req.headers.password)
          .setAdress(req.headers.adress)
          .setBalance(500)
          .setHistory(defaultHistory);
      }
      let newAccount = new Account(AccountObject);

      await newAccount.save();

      res.status(200);
      res.json("succeeded");
    }
  },

  signIn: async (req, res, next) => {
    console.log("signIn route", req.headers);
    if (req.user) {
      console.log("ok");
    } else {
      return null;
    }
    /*const token = new loggedIn({
            LoggedInToken: req.user,
            Check: "check"
        });
        await token.save();*/

    if (req.headers.test !== "yes") {
      res.redirect("/");
    } else {
      let data = {
        verified: "verified",
        session: req.session
      };

      res.json(data);
    }
  }
};