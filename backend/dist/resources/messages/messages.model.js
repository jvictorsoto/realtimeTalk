'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageSchema = new _mongoose2.default.Schema({
  author: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

MessageSchema.method({});

MessageSchema.statics = {
  list: function list() {
    return this.find({});
  }
};

exports.default = _mongoose2.default.model('Message', MessageSchema);