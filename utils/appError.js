const { Error } = require('mongoose');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    //predicted error
    this.isOperational = true;
    //capture stack

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
