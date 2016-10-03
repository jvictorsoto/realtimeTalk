'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _messages = require('./messages.validators');

var _messages2 = _interopRequireDefault(_messages);

var _messages3 = require('./messages.controller');

var _messages4 = _interopRequireDefault(_messages3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').get(_messages4.default.list).post((0, _expressValidation2.default)(_messages2.default.create), _messages4.default.create);

exports.default = router;