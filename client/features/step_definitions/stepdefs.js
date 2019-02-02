const createAccount = require("../../src/createAccountTest");
const fetch = require("node-fetch");
const assert = require("assert");
const { Given, When, Then } = require("cucumber");

Given("a new account object", function() {
  const accountObject = new createAccount("testFront")
    .setFirstName("test")
    .setUserId(123456)
    .setEmail("testFront@mail.com")
    .setPassword(123456)
    .setAdress("test")
    .setBalance(2000);

  this.accountObject = accountObject;
});

When("I send the data", async function() {
  let accountObject = this.accountObject;

  const createdAccount = await fetch("http://localhost:8889/users/signup", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      name: accountObject.name,
      firstName: accountObject.firstName,
      userId: accountObject.userId,
      email: accountObject.email,
      password: accountObject.password,
      adress: accountObject.adress,
      balance: accountObject.balance,
      test: "yes"
    }
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      if (res === "succeeded") {
        this.succeeded = "succeeded";
      }
    });
});

Then("I should be able to create an account", function() {
  assert.equal(this.succeeded, "succeeded");
});

Given("a new account", function() {
  this.userId = 123456;
  this.password = 123456;
});

When("I login", async function() {
  const loggedin = await fetch("http://localhost:8889/users/signinTest", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      test: "yes",
      username: this.userId,
      password: this.password
    }
  })
    .then(res => {
      return res.json();
    })
    .then(async res => {
      assert.equal(res.verified, "verified");
      console.log(res.session);
      if (res.verified === "verified") {
        this.answer = "verified";
      }
    })
    .then(
      fetch("http://localhost:8889/users/logout", {
        method: "GET",
        mode: "cors",
        headers: { test: "yes" },
        credentials: "include"
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          setTimeout(() => {
            assert.equal(res, "logged out");
          }, 0);

          console.log(res);
        })
    );
});

Then('I should be returned "verified"', function() {
  assert.equal(this.answer, "verified");
});

Given("an existing account", function() {
  this.accountName = "testFront";
});

When("I send a delete command", async function() {
  const accountDeleted = await fetch("http://localhost:8889/users/delete", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      test: "yes",
      name: this.accountName
    }
  })
    .then(res => {
      return res.json();
    })
    .then(res => {
      assert.equal(res, "deleted");
      this.answer = "deleted";

      console.log(res);
    });
});

Then('I should be returned "deleted"', async function() {
  assert.equal(this.answer, "deleted");
});

/*Given('a new account', function() {
  
  const accountObject = new createAccount("testFront")
                                  .setFirstName("test")
                                  .setUserId(123456)
                                  .setEmail("testFront@mail.com")
                                  .setPassword(123456)
                                  .setAdress("test")
                                  .setBalance(2000);



fetch("http://localhost:8886/users/signup", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { name : accountObject.name,
              firstName: accountObject.firstName,
              userId: accountObject.userId,
              email: accountObject.email,
              password: accountObject.password,
              adress: accountObject.adress,
              balance: accountObject.balance,
              test: "yes"




      }
    }).then(res => {return res.json()}).then(res => {

      console.log(res)

    }).then(

    fetch("http://localhost:8886/users/signin", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        test: "yes",
        username: accountObject.userId,
        password: accountObject.password
      }
      
    }).then(res => {return res.json()}).then(async (res) => {

      await assert.equal(res, 'verified')

    }));


    this.accountObject = accountObject;

});

When('I login', async function() {

const accountObject = this.accountObject;

 fetch('http://localhost:8886/users/logout', {
      method: "GET",
      mode: "cors",
      credentials: "include"
  
    }).then(res => {return res.json()}).then(res => {

      assert.equal(res, "logged out")

      console.log(res)});



});

Then('I should be able to log out', function() {

const accountObject = this.accountObject;


  fetch('http://localhost:8886/users/delete', {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { 

        test: "yes",
        name: accountObject.name  }
    }).then(res => {return res.json()}).then(res => {

      assert.equal(res, "deleted")

      console.log(res)});
  
});*/