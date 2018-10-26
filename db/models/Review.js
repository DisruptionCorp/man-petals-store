const Sequelize = require('sequelize');
const conn = require('../conn');
const faker = require('faker');

const Review = conn.define('review', {
  content: {
  	type: Sequelize.TEXT,
  	allowNull: false,
  	//defaultValue: faker.Lorem.paragraph(),
  	validate: {
  	  notEmpty: true
  	},
  }
});

module.exports = Review;