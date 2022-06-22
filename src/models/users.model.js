const { db, Sequelize } = require('../config/db');

const User = db.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    photo: {
      type: Sequelize.STRING
    },
    full_name: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false,
      unique: true,
      length: 128
    },
    password: {
      type: Sequelize.STRING(128),
      allowNull: false,
      length: 255
    },
    phone: {
      type: Sequelize.STRING(13)
    },
    address: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING(128)
    },
    postal_code: {
      type: Sequelize.STRING(6)
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: Sequelize.STRING(6),
      defaultValue: 'user'
    },
    token: {
      type: Sequelize.STRING
    },
    updatedAt: {
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

module.exports = User;
