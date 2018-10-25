const conn = require('../conn');
const faker = require('faker');

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    defaultValue: faker.commerce.productName(),
    validate: {
      notEmpty: true,
    },
  },
});
module.exports = Product;
