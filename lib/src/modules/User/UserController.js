"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var user = require('./userModel');

var bcrypt = require('bcrypt');

var env = require('../../config/env');

var BadRequestError = require('../../helpers/errors/400_bad_request');

var jwt = require('jsonwebtoken');

var _require = require('../../helpers/StatusCode'),
    CREATED = _require.CREATED;

var userController = {
  getAll: function () {
    var _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var users;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return user.findAll();

            case 3:
              users = _context.sent;
              res.status(201).json(users);
              _context.next = 12;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0, "GET ALL user");
              next(_context.t0);
              console.log(_context.t0);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function getAll(_x, _x2, _x3) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  register: function () {
    var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var _req$body, first_name, email, password, emailExists, salt, hashedPassword, _user;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, first_name = _req$body.first_name, email = _req$body.email, password = _req$body.password;
              _context2.next = 4;
              return user.findOne({
                where: {
                  email: email
                }
              });

            case 4:
              emailExists = _context2.sent;

              if (!emailExists) {
                _context2.next = 9;
                break;
              }

              throw new BadRequestError('This is user already exist');

            case 9:
              salt = parseInt(env.salt_rounds);
              _context2.next = 12;
              return bcrypt.hash(password, salt);

            case 12:
              hashedPassword = _context2.sent;
              _context2.next = 15;
              return _user.create({
                first_name: first_name,
                email: email,
                password: hashedPassword
              });

            case 15:
              _user = _context2.sent;
              console.log(_user, "After create");
              res.status(201).json(_user);

            case 18:
              _context2.next = 24;
              break;

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0, "ERROOR REGISTER user");
              next(_context2.t0);

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 20]]);
    }));

    function register(_x4, _x5, _x6) {
      return _register.apply(this, arguments);
    }

    return register;
  }(),
  login: function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var _req$body2, email, password, _user2, verifyPasswordBcrypt;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              console.log(req.body);
              _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
              _context3.next = 5;
              return _user2.findOne({
                where: {
                  email: email
                }
              });

            case 5:
              _user2 = _context3.sent;

              if (_user2) {
                _context3.next = 10;
                break;
              }

              throw new BadRequestError("Sorry! Account does not exists .");

            case 10:
              console.log("LOGIN req body after veriyemail", _user2);
              _context3.next = 13;
              return bcrypt.compare(password, _user2.password);

            case 13:
              verifyPasswordBcrypt = _context3.sent;

              if (verifyPasswordBcrypt) {
                _context3.next = 18;
                break;
              }

              throw new BadRequestError("Your password is false .");

            case 18:
              _user2.access_token = jwt.sign({
                id: _user2.id,
                email: _user2.email
              }, env.jwt_secret, {
                expiresIn: '5m'
              });
              _user2.refresh_token = jwt.sign({
                id: _user2.id
              }, env.jwt_secret, {
                expiresIn: '60d'
              });
              _context3.next = 22;
              return _user2.save();

            case 22:
              res.cookie('refresh_token', _user2.refresh_token, {
                expiresIn: '60d',
                httpOnly: 'true'
              });
              res.status(CREATED).json('Hello user ' + _user2.first_name);

            case 24:
              _context3.next = 30;
              break;

            case 26:
              _context3.prev = 26;
              _context3.t0 = _context3["catch"](0);
              console.error("LOGIN ERROR", _context3.t0);
              next(_context3.t0);

            case 30:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 26]]);
    }));

    function login(_x7, _x8, _x9) {
      return _login.apply(this, arguments);
    }

    return login;
  }()
};
module.exports = userController;