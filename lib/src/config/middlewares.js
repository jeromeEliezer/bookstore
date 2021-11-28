"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var middlewares = {
  json: _express["default"].json(),
  urlencoded: _express["default"].urlencoded({
    extended: false
  }),
  cookieParser: (0, _cookieParser["default"])()
};
var _default = middlewares;
exports["default"] = _default;