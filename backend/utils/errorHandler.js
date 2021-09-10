//handle the error message
class ErrorHandler extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        /** Create .stack property on a target object */
        Error.captureStackTrace(this, this.constructor);

    }
}


module.exports = ErrorHandler;