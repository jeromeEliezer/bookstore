"use strict";

var _express = _interopRequireDefault(require("express"));

var _env = _interopRequireDefault(require("./src/config/env"));

var _server = _interopRequireDefault(require("./src/config/server"));

var _middlewares = _interopRequireDefault(require("./src/config/middlewares"));

var _modules = _interopRequireDefault(require("./src/modules"));

var _errorHandler = _interopRequireDefault(require("./src/middlewares/errorHandler"));

var _database = _interopRequireDefault(require("./src/config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var http = (0, _express["default"])();
var server = new _server["default"](http);
server.middlewares(_middlewares["default"]);
server.routes(_modules["default"]);
server.errorHandler(_errorHandler["default"]);

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _database["default"].associateAll(_database["default"].sequelize.models);

        case 3:
          console.log('Connection has been established successfully.');
          _context.next = 6;
          return server.start(_env["default"].app_port);

        case 6:
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.log('Unable to connect to the database:', _context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[0, 8]]);
}))();