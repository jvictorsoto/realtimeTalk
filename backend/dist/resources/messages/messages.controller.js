'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _messages = require('./messages.model');

var _messages2 = _interopRequireDefault(_messages);

var _events = require('../events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function list(req, res, next) {
    _messages2.default.list().then(function (messages) {
        res.json(messages);
    }).catch(function (reason) {
        console.log('Error listing messages: ', reason);
        res.status(500).json({ msg: 'DB blew up' });
    });
}

function create(req, res, next) {
    console.log('Storing message: ', req.body);
    var message = new _messages2.default(req.body);
    message.save().then(function () {
        _events.io.emit('newMessage', { author: message.author, text: message.text, date: message.date });
        res.status(201).send({ msg: 'Message stored and broadcasted.' });
    }).catch(function (reason) {
        console.log('Error saving message: ', reason);
        res.status(500).json({ msg: 'DB blew up' });
    });
}

exports.default = { list: list, create: create };