import express from 'express';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import expressValidation from 'express-validation';
import httpStatus from 'http-status';
import config from './config';
import apiEvents from './resources/events';
import APIError from './utils/APIError';


// promisify mongoose
mongoose.Promise = Promise;

// connect to mongo db
mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } });

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.db}`);
});
mongoose.connection.on('connected', () => {
  console.log(`connection to database: ${config.db} establecied`);
});
mongoose.connection.on('disconnected', () => {
  console.log(`connection to database: ${config.db} lost`);
});

const app = express();
const httpServer = http.Server(app); // eslint-disable-line new-cap
const io = socketIO(httpServer);
apiEvents.build(io);

// Allow Cross Origin Requests
app.use(cors());

// Parse body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoints binding
app.use('/api', require('./resources/routes').default);

// Serve client static files
app.use(express.static('static'));

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // Better response for Validation errors, allowing access to wrong fields
    return res.status(err.status).json({ message: err.statusText, errors: err.errors });
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    msg: err.message,
    stack: config.env === 'development' ? err.stack : {}
  })
);

// Start the express app
httpServer.listen(config.port, err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('Listening ....');
});
