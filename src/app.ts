import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import { getEnv } from './env';
import statusCode from 'http-status-codes';
import Boom from 'boom';
import { ResponseFormat } from './core/ResponseFormat';
import morgan from 'morgan';
import { leadRoute } from './routes/v1/lead/resource';
import serverless from 'serverless-http';
import sequelizeConnection from './clients/sequelize/config';
// import '../src/clients/sequelize/init';
import './models/associations';

const response = new ResponseFormat();


process.on('uncaughtException', (e) => {
  console.error(e.message);
});

const app = express();

app.set("port", process.env.PORT || 3001);

//this is more like a health check endpoint
app.get("/api/v1/health", async (req, res) => {
  return sequelizeConnection.authenticate().then(() => {
    res.json({ 
      system: "up",
      database: "up",
     })
  }).catch((error: any) => {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      system: "down",
      database: "down",
    });
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

// Routes
app.use('/api/v1/lead', leadRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (getEnv().NODE_ENV === 'development') {
      console.error(err.message);
      const { output } = Boom.badRequest(err.message);
      return response.handleError(res, output);
      //return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});



export default app;
export const handler = serverless(app);
