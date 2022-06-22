const { validationResult } = require('express-validator');
const { failed } = require('../helpers/response');
const { registerValidation } = require('./auth.validation');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return failed(res, 400, extractedErrors);
};

module.exports = {
  validate,
  registerValidation
};
