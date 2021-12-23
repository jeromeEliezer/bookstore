import { BAD_REQUEST } from "../StatusCode";

 class ValidationError extends Error {
  constructor(errors, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    const message = "La validation des entrées a échouée";

    this.name = `ValidationError`;
    this.status = BAD_REQUEST;
    this.message = message;
    this.errors = errors;
  }
};

export default ValidationError;
