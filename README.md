
### Dependencies

- [Node 16 (Latest LTS version)](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Typescript](https://www.typescriptlang.org/download)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Serverless](https://www.serverless.com/framework/docs/getting-started)

## How to run locally?

- First create `.env.development` file in the root directory and put the following content in it

```
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://my_user:password123@localhost/zgt-dev

```

- Create another `.env.test` for testing and copy this content inside it

```
PORT=3001
NODE_ENV=test
MONGO_URI=mongodb://my_user:password123@localhost:27018/zgt-test

```

- Use the following steps to run the application

Step 1. `yarn install` to install dependencies

Step 2. `yarn start:db` to spin up local development and test mysql database in docker container
*** it takes about 3-5 seconds for the DB container to fully spin up ***
Tip: You can make a simple `GET` request to the `/api/v1/health` (see [here](https://documenter.getpostman.com/view/3683187/UVXjLc2v#508a82f5-676d-41a8-aea3-0b525cf45d40)) check endpoint to see if the database and other system components are up and running. 

Step 3. `yarn start:dev` to start the application locally

Step 4: `yarn start:offline` to run the application as a FaaS

## How to test? 

`yarn test`

## Endpoints

Please see the Postman collection here: https://documenter.getpostman.com/view/3683187/UVXjLc2v

## How the request cycle works

- HTTP Request comes in,
- Injects necessary middleware(s) and passes through,
- Controller intecepts it, 
- Controller calls the appropriate service (`LeadService` in this case),
- Service calls the appropriate DAO to get data,
- Returns it back to the controller,
- Controller returns back to the user as a response

## Things to note 

- I used latest LTS version of Node JS
- I used AWS as my FaaS provider
- I used MongoDB as my database but i would have preferred to use a MySQL (which i initially used) because the task has to do with relationships(1:m) but sequelize (ORM) had some problems with serverless and it was taking too much of my time in completing the task.
- There's an `hasMany` relationship between `Lead` and `Interests` and `belongsTo` relationhip between `Interests` and `Lead`.
- I added `/health` checkendpoint to check if database connection is okay and also if overall system is working as expected. In a production ready system we can integrate monitoring/telemetry systems and APMs like `new relic`, `prometheus`+`grafana` etc
- I containerized both development and test databases. See the command [here](https://github.com/SirPhemmiey/zgt-2#how-to-run-locally) to know how to spin it up in just one single command. 
- Even though the functionalities are the same, i separated the endpoints for lead to submit request and for ISD to manually add leads and their interests because in future we might want to add extra functionalities to only the lead request form function (which is called by the leads directly) and not to the internal endpoint used to add leads by the ISD. 
- I add input validations using Joi

## Best practices, patterns and principles used in the project can be found here

https://github.com/SirPhemmiey/zgt-2/blob/master/PATTERNS.md