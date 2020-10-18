![alt text](Spootify_Logo.png "Logo")
# Spootify Test Suite

## Setup
##### Install requirements
```
yarn install
```
##### Start target application
make sure the Spootify application is running and hosted at http://localhost:3000

## Running tests

| Script       | Run with npm run or yarn                       |
|--------------|------------------------------------------------|
| ```yarn e2e```         | run tests                                    |
| ```yarn e2e:gui```      | open cypress gui                               |
| ```yarn e2e:record```   | run tests and upload results to cypress dashboard |
| ```yarn e2e:chrome```   | run tests in chrome                          |
| ```yarn e2e:edge```     | run tests in microsoft edge                  |
| ```yarn e2e:firefox```  | run tests in firefox                         |
| ```yarn e2e:headless``` | run tests headless in electron               |

## Reports
The reports for this project can be found on the [Cypress Dashboard](https://dashboard.cypress.io/projects/hpu3z2/runs/2/specs)