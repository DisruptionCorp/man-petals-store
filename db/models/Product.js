const Sequelize = require('sequelize');
const conn = require('../conn');
const faker = require('faker');

const Product = conn.define(
  'product',
  {
    name: {
      type: conn.Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: faker.commerce.productName(),
      validate: {
        notEmpty: true,
      },
    },
    description: Sequelize.TEXT,
    inv_quantity: Sequelize.INTEGER,
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true, // to be changed to false when app gets up and running
      validate: {
        isDecimal: true,
      },
    },
    photo: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
      defaultValue:
        'https://cdn.pixabay.com/photo/2016/05/05/08/45/vase-1373443_960_720.jpg',
    },
    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true,
    },
  },
  {
    // hooks: {
    //   afterValidate(product) {
    //     if (product.price) {
    //       product.price = product.price.toFixed(2);
    //     }
    //   },
    // },
    //can't add price from admin tool as per this hook
  }
);

module.exports = Product;
