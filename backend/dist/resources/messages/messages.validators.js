'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  create: {
    body: {
      author: _joi2.default.string().min(3).max(40).required(),
      text: _joi2.default.string().min(1).max(500).required()
    }
  }
};