const { db, Sequelize } = require('../config/db');

const Activity = db.define(
  'activities',
  {
    activity_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    destination_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    imageId: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    note: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    suggestion: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    is_popular: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
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

module.exports = Activity;
