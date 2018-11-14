# HackerBay Interview Backend Task

## How to run project
1. Clone this repo and `cd` into it.
1. Run `npm install` to install all the dependencies.
1. Run `npm start` to start the microservice server.

**Note** - For development use `npm run dev` as it runs the server in watch mode and has formatted logs. To see other commands enter `npm run`.

## Main Focus

1. Follow industry standards and conventions.
1. Be consistent.
1. Write modular code.
1. Set correct status codes.
1. All server responses should have same structure.

## Conventions
Apart from the linting rules of standard, I follow some other conventions too.

1. First require external dependencies.
1. After one line space require internal dependencies.
1. The order of requiring internal dependencies is also same (routes then middlewares then handlers then validators then utils).
1. The name of the module should inform what type of module it is (middleware, handler, etc.)
1. Only use anonymous function when function body is single line (like a lambda expression)

## Decisions I made

1. For the test runner, I used jest over mocha because jest has instanbul already built-in. This means I can spend more time on writing better tests than on setting up the toolchain. Apart from that, the test code is almost similar, so understanding them won't be difficult.
1. Used standard javascript style because I checked some code on [this](https://github.com/hackerbay/lighthouse-tests/blob/lighthouse-ci/test/lightHouse.test.js) hackerbay repo. There were no semi-colons so I guessed it was standard javascript style.
1. Used polka for web server because it has very small footprint and faster performance. Ideal for a microservice.
1. Used fast-json-patch because the benchmarks suggests it is faster than others.

## Eligible for Bonus points

* [x] Extra Documentation
* [x] Include JSdoc comments and/or Swagger specifications to impress us.
* [x] Logging / Monitoring
* [x] Integrate a centralized app logging/monitoring system.
