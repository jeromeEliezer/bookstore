"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _controller = _interopRequireDefault(require("./controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import  
var _default = function _default(controller) {
  var router = (0, _express.Router)();
  router.route('/login').post(controller.login);
  router.route('/register').post(controller.login);
  router.route('/').get(controller.getAll);
  return router;
};

exports["default"] = _default;