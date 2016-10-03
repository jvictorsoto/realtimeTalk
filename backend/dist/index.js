'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _events = require('./resources/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// promisify mongoose
_mongoose2.default.Promise = _bluebird2.default;

// connect to mongo db
_mongoose2.default.connect(_config2.default.db, { server: { socketOptions: { keepAlive: 1 } } });

_mongoose2.default.connection.on('error', function () {
    throw new Error('unable to connect to database: ' + _config2.default.db);
});
_mongoose2.default.connection.on('connected', function () {
    console.log('connection to database: ' + _config2.default.db + ' establecied');
});
_mongoose2.default.connection.on('disconnected', function () {
    console.log('connection to database: ' + _config2.default.db + ' lost');
});

var app = (0, _express2.default)();
var httpServer = _http2.default.Server(app);
var io = (0, _socket2.default)(httpServer);
_events2.default.build(io);

// Allow Cross Origin Requests
app.use((0, _cors2.default)());

// Parse body
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// API endpoints binding
app.use('/api', require('./resources/routes').default);

// Serve client static files
app.use(_express2.default.static('static'));

// Failover function
app.use(function (req, res, next) {
    res.status(404).send('Not found!!');
});

// Start the express app
httpServer.listen(_config2.default.port, function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Listening ....');
});