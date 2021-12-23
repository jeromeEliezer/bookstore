import { UNAUTHORIZED } from "../StatusCode";

class UnauthorizedError extends Error {
    constructor(message, description, ...params) {
        super(...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, UnauthorizedError);
        }
        this.name = `UnauthorizedError`;
        this.status = UNAUTHORIZED;
        this.message = message;
        this.description = description;
    }
};

export default UnauthorizedError;