const { db, Sequelize } = require('../config/db');

const Transaction = db.define(
  'transactions',
  {
    transaction_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    activity_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    full_name: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING(13)
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    total_price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false
    },
    insurance: {
      type: Sequelize.BOOLEAN,
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

module.exports = Transaction;
