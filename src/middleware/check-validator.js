const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

module.exports = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log({ errors: errors.array() });
    next(createHttpError(400, 'Validation error.'));
    return;
  }
  next();
};