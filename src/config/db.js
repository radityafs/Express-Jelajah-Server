const Sequelize = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = require('../../env');

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false
});

const dbCon = db
  .authenticate()
  .then(async () => {
    await db.sync({ forced: true });
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { db, dbCon, Sequelize };
