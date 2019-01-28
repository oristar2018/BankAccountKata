Feature: Can i create an account?
  Check if i can create an account

  Scenario: Account Creation
    Given a new account
    When I send it to the database
    Then the account should be created and returned 


   