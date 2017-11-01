'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('../routes/index');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var port = process.env.PORT || 7000;
var app = (0, _express2.default)();

app.use('/api/v1/recipes', _index.recipeRoute);

app.use('/api/v1/users', _index.userRoute);

app.listen(port, function () {
  console.log('listening to port ' + port);
});

exports.app = app;