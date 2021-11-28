"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var errorHandler = function errorHandler(err, req, res, next) {
  var status = err.status || 500;
  console.error(err);
  res.status(status).json(err.message);
};

var _default = errorHandler;
exports["default"] = _default;