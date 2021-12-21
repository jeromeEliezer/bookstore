"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _statusCode = require("../helpers/statusCode");

var errorHandler = function errorHandler(error, request, response, next) {
  var errors = error.errors;
  var status = error.status,
      message = error.message,
      description = error.description;

  if (!status) {
    status = _statusCode.SERVER_ERROR;
    message = "Oups ! Quelque chose ne fonctionne pas !";
    description = "Le serveur SwimangoApi rencontre un problème technique. Veuillez réessayer plus tard.";
  }

  if (error.name === "ValidationError") {
    response.status(status).json({
      message: message,
      errors: errors
    });
  } else {
    response.status(status).json({
      message: message,
      description: description
    });
  }
};

var _default = errorHandler;
exports["default"] = _default;