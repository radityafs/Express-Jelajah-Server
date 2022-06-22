const { verifyToken } = require('../helpers/jwt');
const { failed } = require('../helpers/response');

const AuthJwt = (req, res, next) => {
  try {
    const { token } = req.headers;

    const tokenData = verifyToken(token);
    if (!tokenData) {
      return failed(res, 401, 'Invalid Token');
    }

    req.APP_DATA = { tokenDecoded: tokenData };

    next();
  } catch (err) {
    failed(res, 401, 'Invalid Token');
  }
};

module.exports = AuthJwt;
