"use strict";

var _express = _interopRequireDefault(require("express"));

var _env = _interopRequireDefault(require("./src/config/env"));

var _server = _interopRequireDefault(require("./src/config/server"));

var _middlewares = _interopRequireDefault(require("./src/config/middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var http = (0, _express["default"])();
var server = new _server["default"](http);
server.middlewares(_middlewares["default"]);
server.start(_env["default"].app_port);