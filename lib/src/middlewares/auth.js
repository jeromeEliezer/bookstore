"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Env = require("../config/Env");

var _unauthorized = _interopRequireDefault(require("../helpers/errors/401_unauthorized"));

var _PatientModel = _interopRequireDefault(require("../modules/Patient/PatientModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isAuth = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var access_token, _refresh_token, patient;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            access_token = req.headers.authorization.split(' ')[1];
            _refresh_token = req.cookies['refresh_token'];

            if (_refresh_token) {
              _context.next = 5;
              break;
            }

            throw new _unauthorized["default"]('Access denied. Your session expired.');

          case 5:
            _context.next = 7;
            return _PatientModel["default"].findOne({
              where: {
                access_token: access_token,
                refresh_token: _refresh_token
              }
            });

          case 7:
            patient = _context.sent;

            if (patient) {
              _context.next = 10;
              break;
            }

            throw new _unauthorized["default"]('Access denied. Your session expired.');

          case 10:
            _context.next = 12;
            return _Env.jwt_secret.verify(access_token, config.jwt_secret);

          case 12:
            req.patient = patient;
            next();
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(401).json(_context.t0.message));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));

  return function isAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var refreshAccess = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var refreshToken, decoded, patient;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            refreshToken = req.cookies['refresh_token'];

            if (refresh_token) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", res.status(401).json('Access denied. Your session expired'));

          case 4:
            _context2.next = 6;
            return jwt.verify(refresh_token, config.jwt_secret);

          case 6:
            decoded = _context2.sent;
            _context2.next = 9;
            return _PatientModel["default"].findOne({
              where: {
                id: decoded.id
              }
            });

          case 9:
            patient = _context2.sent;
            patient.access_token = jwt.sign({
              id: patient.id,
              email: patient.email
            }, config.jwt_secret, {
              expiresIn: '5m'
            });
            _context2.next = 13;
            return patient.save();

          case 13:
            res.status(200).json(patient);
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(401).json(_context2.t0.message));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));

  return function refreshAccess(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  isAuth: isAuth,
  refreshAccess: refreshAccess
};
exports["default"] = _default;