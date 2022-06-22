const { db, Sequelize } = require('../config/db');

const ImageActivity = db.define('image_activities', {
  imageId: {
    type: Sequelize.STRING(128),
    allowNull: false
  },
  name: {
    type: Sequelize.STRING(128),
    allowNull: false
  }
});

module.exports = ImageActivity;
