const { verifyToken } = require('../helpers/jwt');
const { failed } = require('../helpers/response');

const isUser = (req, res, next) => {
  try {
    const { token } = req.headers;

    const tokenData = verifyToken(token);
    if (!tokenData) {
      return failed(res, 401, 'Invalid Token');
    }

    if (tokenData.role !== 'user') {
      return failed(res, 401, 'You are not authorized to access this resource');
    }

    req.APP_DATA = { tokenDecoded: tokenData };

    next();
  } catch (err) {
    failed(res, 401, 'Invalid Token');
  }
};

module.exports = isUser;
