const { db, Sequelize } = require('../config/db');

const Destination = db.define(
  'destinations',
  {
    destination_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    PhotoBackground: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    photo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    temperature: {
      type: Sequelize.STRING,
      allowNull: false
    },
    best_time_to_visit: {
      type: Sequelize.STRING,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);

module.exports = Destination;
