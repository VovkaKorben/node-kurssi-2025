This source code demonstrates running of simple tests from three packages (ESLint, Vitest, Supertest).

### ESLint ###
Powerful JS linter. In config file we defines some own rules for code checking.
# "no-unused-vars": "error" #
    ESLint will throw an error if code uses define a variable, but no used it.
# "no-undef": "warn" #
    ESLint will warn if code uses a variable that has not been defined anywhere.

### Vitest ###
In the tests, we test the functionality by comparing the value obtained with the expected value.
We also have the opportunity to assign a text label to the test.

### Supertest ###