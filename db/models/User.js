const Sequelize = require('sequelize');
const conn = require('../conn');
const faker = require('faker');

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    defaultValue: faker.name.firstName(),
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
});

module.exports = User;
