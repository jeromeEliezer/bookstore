"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _controller = _interopRequireDefault(require("./controller"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var models = {
  User: _model["default"]
};
var controller = new _controller["default"](models);
var router = router(controller);
var _default = router;
exports["default"] = _default;