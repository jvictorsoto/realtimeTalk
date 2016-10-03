'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var io = null;

function build(ioInstance) {
    exports.io = io = ioInstance;
    io.on('connection', function (socket) {
        console.log('[SocketIO] a user connected...');
    });
    io.on('disconnect', function (socket) {
        console.log('[SocketIO] a user disconnected...');
    });
}

exports.io = io;
exports.default = { build: build };