# Bank account kata

Version 1.00, ready for download.

## Requirements
Deposit and Withdrawal
Account statement (date, amount, balance)
Statement printing

### User Stories

US 1:
In order to save money
As a bank client
I want to make a deposit in my account

US 2:
In order to retrieve some or all of my savings
As a bank client
I want to make a withdrawal from my account

US 3:
In order to check my operations
As a bank client
I want to see the history (operation, date, amount, balance) of my operations

## Environment 

This Kata will be written using Javascript in the NodeJS environment, using the M.E.R.N stack (MongoDB, Express, React, Node).

Click [here](https://nodejs.org/en/download/) to download and install NodeJS.

The package manager npm will be installed with it.

I recommend the use of [Chocolatey](https://chocolatey.org/) to install NodeJS.

### Unit testing and functional testing

The unit tests will be written and conducted with Jest.

They will test the classes we use to create account objects and modify the account's balance and history.

The functional tests will be written with Cucumber-JS.

They will simulate all of the application process (Account creation => log in => logout => account deletion and deposit / withdrawal) in real-time via endpoint testing and api calls for the front-end part.


## Installation

First, make sure to install [Docker](https://www.docker.com/get-started) on your computer.

For some systems, you might need to install Docker-compose as a separate entity

Then, clone the repository on your system and install the program by typing:

``npm run bankInstall``

Then navigate to the program interface at [http://localhost:8887](http://localhost:8887) or type from the CLI:

``start http://localhost:8887``

You can launch the test suite with:

``npm test``

for the back-end tests, navigate to the root directory of your program.

for the front-end tests, navigate to the client folder in the root directory of the program.

To tear down the application, type:

``docker-compose down``

Each acccount will be credited with 500$ on creation.