### Dependencies

- Node
- Yarn

## How to run locally?

- First create .env.development file in the root directory and put the following content in it

```
PORT=11700
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/pencil-dev
SERVICE_ACCOUNT=your service account

```

You can also create another .env.testing for testing and copy this content inside it

```
PORT=11700
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/pencil-test
SERVICE_ACCOUNT=your service account

```
You can use this [tool](https://jsontostring.com/convert-json-to-one-line/) to convert your service account JSON into one line. 

- Run the following to start

```
yarn install
yarn start

```

## How to test? 

`yarn test`

## Endpoints

Please see the Postman collection here: https://documenter.getpostman.com/view/3683187/UVXhqcTc

## Patterns and Principles used in the project

https://github.com/SirPhemmiey/fct/blob/master/IDEAS.md

## Note
- I couldn't finish the `translate/:url` because of the timeframe i gave myself. Every other thing was done. 