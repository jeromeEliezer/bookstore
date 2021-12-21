"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = {
  port: process.env.PORT || 3,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  jwt_secret: process.env.JWT_SECRET,
  salt_rounds: process.env.SALT_ROUNDS,
  dialect: "mysql",
  seederStorage: "sequelize"
};
var _default = env;
exports["default"] = _default;