"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = {
  app_port: process.env.APP_PORT ? process.env.APP_PORT : 4000
};
var _default = env;
exports["default"] = _default;