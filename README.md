![alt text](Spootify_Logo.png "Logo")
# Spootify Test Suite

## Setup
##### Install requirements
```
yarn install
```
##### Start target application
make sure the Spootify application is running and hosted at http://localhost:3000.

## Running tests

| Script       |                        |
|--------------|------------------------------------------------|
| ```yarn e2e:web```         | run tests locally in web format |
| ```yarn e2e:mobile```         | run tests locally in mobile format |
| ```yarn e2e:gui:web```      | open cypress gui in web format |
| ```yarn e2e:gui:mobile```      | open cypress gui in mobile format |
| ```yarn e2e:record:web```   | run tests in web format and upload results to cypress dashboard |
| ```yarn e2e:record:mobile```   | run tests in mobile format and upload results to cypress dashboard |


## Reports
The reports for these tests can be found on the [Spootify Cypress Dashboard](https://dashboard.cypress.io/projects/hpu3z2/).  
Running a script with 'record' saves the test data to the dashboard.

## Tests

Located in [cypress/integration](../cypress/integration)