require('dotenv').config();

const env = {
  //app
  PORT: process.env.PORT || 8000,

  //jwt
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '1d',

  //database
  DB_NAME: process.env.DB_NAME || 'jelajah',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASS: process.env.DB_PASS || '',
  DB_HOST: process.env.DB_HOST || 'localhost',

  //rabbitmq
  RABBITMQ_SERVER: process.env.RABBITMQ_SERVER || 'amqp://localhost',

  //mail
  AWS_SES_HOST: process.env.AWS_SES_HOST,
  SES_PORT: process.env.SES_PORT || 465,
  SES_USER: process.env.SES_USER,
  SES_PASS: process.env.SES_PASS,

  APP_URL: process.env.APP_URL || 'http://localhost:8000'
};

module.exports = env;
