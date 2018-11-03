const Sequelize = require('sequelize');
const conn = require('../conn');
const faker = require('faker');

const Review = conn.define('review', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Review;
