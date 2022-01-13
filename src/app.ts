import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { NotFoundError, ApiError, InternalError } from './core/ApiError';
import { getEnv } from './env';
import Boom from 'boom';
import { ResponseFormat } from './core/ResponseFormat';
import morgan from 'morgan';
import { getService } from './di-container';
import { translateRoute } from './routes/v1/translate/resource';
import { parserRoute } from './routes/v1/parse/resource';
import { fileRoute } from './routes/v1/file/resource';
import { authRoute } from './routes/v1/auth/resource';

const response = new ResponseFormat();


process.on('uncaughtException', (e) => {
  console.error(e.message);
});

const app = express();

app.set("port", process.env.PORT || 3001);

//this is more like a health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "up" })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("tiny"));

// Routes
app.use('/api/v1/parse', parserRoute);
app.use('/api/v1/translate', translateRoute);
app.use('/api/v1/file', fileRoute);
app.use('/api/v1/auth', authRoute);

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

/**
 * this should not be here but for the sake of having a test user in the DB
 */
(async() => {
    await getService().userService.create({
        name: 'tester',
        email: 'tester@gmail.com',
        password: '123'
    }).then(() => {
        console.log('test user created!');
    });
})()

export default app;