const { body } = require('express-validator');

const registerValidation = () => [
  body('full_name')
    .isLength({ min: 8, max: 128 })
    .withMessage('invalid full name, min 8 chars, max 128 chars'),
  body('email')
    .isEmail()
    .withMessage('invalid email, please enter a valid email'),
  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('invalid password. min 8 chars, max 16 chars')
];

const loginValidation = () => [
  body('email')
    .isEmail()
    .withMessage('invalid email, please enter a valid email'),

  body('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('invalid password. min 8 chars, max 16 chars')
];

const generateTokenValidation = () => [
  body('refreshToken')
    .isLength({ min: 5 })
    .withMessage('refresh token is required')
];

module.exports = {
  registerValidation,
  loginValidation,
  generateTokenValidation
};
