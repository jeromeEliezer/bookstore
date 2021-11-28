"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = {
  app_port: process.env.app_port ? process.env.app_port : 4000,
  db_name: process.env.db_name,
  db_user: process.env.db_user,
  db_password: process.env.db_password,
  db_host: process.env.db_host,
  secret: process.env.secret
};
var _default = env;
exports["default"] = _default;