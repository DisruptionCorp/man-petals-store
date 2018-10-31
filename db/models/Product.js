const Sequelize = require('sequelize');
const conn = require('../conn');
const faker = require('faker');

const Product = conn.define('product', {
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
  	type: Sequelize.DECIMAL(10,2),
  	allowNull: true, // to be changed to false when app gets up and running
  	validate: {
  	  isDecimal: true
  	},
  },
  photo: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: true,
  }
}, {
  hooks: {
  	afterValidate(product){
  	  if(product.price) {
  	    product.price = product.price.toFixed(2)
  	  }
  	}
  }
});


module.exports = Product;
