This source code demonstrates running of simple tests from three packages (ESLint, Vitest, Supertest).

# ESLint
Powerful JS linter. In config file we defines some own rules for code checking.  
`"no-unused-vars": "error"` ESLint will throw an error if code uses define a variable, but no used it.  
`"no-undef": "warn"` ESLint will warn if code uses a variable that has not been defined anywhere.

# Vitest
In the tests, we test the functionality by comparing the value obtained with the expected value.
We also have the opportunity to assign a text label to the test.
In examples we test simple function, that add two number.
Tests includes 3 variants of arguments and expected results.

# Supertest
In this test suite we testing simple http-server.
Server serve just one GET-route **/api/health**.
Test check 2 suites: is specified route served ok and invalid (non-existsing) route.
## Supertest vs Postman
Postman is for research and documentation, and Supertest is for automatic regression during development

# Running tests
* ESLint: `npm run lint`
* Vitest: `npm run vitest`
* Supertest: `npm run supertest`

