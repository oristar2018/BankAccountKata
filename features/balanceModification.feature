Feature: Can i deposit or withdraw money?
  Check if i can deposit or withdraw money

  Scenario: Account modification
    Given an account and a positive balance
    When I attempt to deposit or withdraw money
    Then the balance should be modified accordingly