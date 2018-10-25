const conn = require('../conn');
const faker = require('faker');

const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    defaultValue: faker.name.firstName(),
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
