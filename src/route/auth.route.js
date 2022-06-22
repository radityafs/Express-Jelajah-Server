const express = require('express');

const router = express.Router();
const {
  register,
  login,
  generateToken,
  verifyAccount
} = require('../controllers/auth.controller');
const AuthJwt = require('../middleware/auth.jwt');

const {
  loginValidation,
  generateTokenValidation
} = require('../validation/auth.validation');

const { validate, registerValidation } = require('../validation/index');

router
  .post('/register', registerValidation(), validate, register)
  .post('/login', loginValidation(), validate, login)
  .post('/generateToken', generateTokenValidation(), validate, generateToken)
  .get('/verify/:token', AuthJwt, verifyAccount);
module.exports = router;
