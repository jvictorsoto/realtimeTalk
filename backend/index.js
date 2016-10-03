import express from 'express';
import Promise from 'bluebird';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import http from 'http';
import socketIO from 'socket.io';
import cors from 'cors';
import config from './config';
import apiEvents from './resources/events';


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
const httpServer = http.Server(app);
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

// Failover function
app.use((req, res, next) => {
    res.status(404).send('Not found!!');
});

// Start the express app
httpServer.listen(config.port, (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Listening ....');
});