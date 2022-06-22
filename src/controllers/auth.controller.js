const bcrypt = require('bcrypt');
const UserModel = require('../models/users.model');
const uuid = require('uuid');
const {
  sendMessageVerificationEmail
} = require('../helpers/SendMessage.rabbitmq');

const { success, failed } = require('../helpers/response');
const { createToken, generateRefreshToken } = require('../helpers/jwt');
const { APP_URL } = require('../../env');

module.exports = {
  register: (req, res) => {
    const { full_name, password, email } = req.body;
    const saltRounds = 10;

    bcrypt
      .hash(password, saltRounds)
      .then((hash) => {
        const user = new UserModel({
          full_name,
          password: hash,
          email,
          token: uuid.v4()
        });

        user
          .save()
          .then((data) => {
            const token = createToken({
              id: data.id,
              full_name,
              email,
              role: 'user'
            });
            // sendMessageVerificationEmail({
            //   full_name,
            //   email,
            //   url: `${APP_URL}/verify/${data.token}`
            // });

            return success(res, 201, {
              message: 'Successfuly Registered',
              token
            });
          })
          .catch((err) => {
            return failed(res, 500, err.message);
          });
      })
      .catch((err) => {
        return failed(res, 500, err.message);
      });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return failed(res, 404, 'User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return failed(res, 401, 'Invalid password');
    }

    const token = createToken({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role
    });

    return success(res, 200, {
      message: 'Successfuly Logged In',
      token,
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        photo: user.photo,
        is_verified: user.is_verified
      }
    });
  },
  generateToken: (req, res) => {
    const { refreshToken } = req.body;

    const Generatetoken = generateRefreshToken(refreshToken);

    if (!Generatetoken) {
      return failed(res, 401, 'Invalid token');
    }

    return success(res, 200, {
      message: 'Successfuly Generated Token',
      token: Generatetoken
    });
  },
  verifyAccount: async (req, res) => {
    const { token } = req.params;
    const { id } = req.APP_DATA.tokenDecoded;

    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      return failed(res, 404, 'User not found');
    }

    if (user.is_verified) {
      return failed(res, 400, 'User already verified');
    }

    if (user.token !== token) {
      return failed(res, 400, 'Invalid token');
    }

    UserModel.update(
      {
        is_verified: true,
        token: null
      },
      { where: { id } }
    ).then((user) => {
      if (!user) {
        return failed(res, 404, 'User not found');
      }

      return success(res, 200, {
        message: 'Successfuly verified'
      });
    });
  }
};
