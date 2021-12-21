"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _errorHandler2 = _interopRequireDefault(require("../middlewares/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _http = /*#__PURE__*/new WeakMap();

var Server = /*#__PURE__*/function () {
  function Server(http) {
    _classCallCheck(this, Server);

    _classPrivateFieldInitSpec(this, _http, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _http, http);
  }

  _createClass(Server, [{
    key: "middlewares",
    value: function middlewares(_middlewares) {
      for (var key in _middlewares) {
        _classPrivateFieldGet(this, _http).use(_middlewares[key]);
      }
    }
  }, {
    key: "routes",
    value: function routes(_routes) {
      for (var path in _routes) {
        _classPrivateFieldGet(this, _http).use(path, _routes[path]);
      }
    }
  }, {
    key: "errorHandler",
    value: function errorHandler(_errorHandler) {
      _classPrivateFieldGet(this, _http).use(_errorHandler);
    }
  }, {
    key: "start",
    value: function start(port) {
      _classPrivateFieldGet(this, _http).listen(port, function () {
        console.log('===============================');
        console.log("server started on port  ".concat(port));
        console.log('===============================');
      });
    }
  }]);

  return Server;
}();

var _default = Server;
exports["default"] = _default;