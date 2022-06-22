const jwt = require('jsonwebtoken');

const {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN
} = require('../../env');

const createRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN
  });
};

const createToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  const refreshToken = createRefreshToken(payload);

  return {
    token,
    refreshToken
  };
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

const generateRefreshToken = (token) => {
  const payload = jwt.verify(token, JWT_REFRESH_SECRET);

  if (payload) {
    return jwt.sign(payload, JWT_SECRET);
  }
};

module.exports = {
  createRefreshToken,
  createToken,
  verifyToken,
  generateRefreshToken
};
