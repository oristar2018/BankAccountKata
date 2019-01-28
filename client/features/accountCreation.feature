Feature: Can i create an account?
  Check if i can create an account, log in, log out and delete the account

  Scenario: Account Creation
    Given a new account object
    When I send the data
    Then I should be able to create an account

  Scenario: Log in
    Given a new account
    When I login
    Then I should be returned "verified"


  Scenario: Delete account
    Given an existing account
    When I send a delete command
    Then I should be returned "deleted"
   