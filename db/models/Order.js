const conn = require('../conn');
// const { LineItem } = require('../index');
const Order = conn.define('order', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: conn.Sequelize.ENUM('CART', 'ORDER'),
    allowNull: false,
    defaultValue: 'CART',
  },
  total: {
    type: conn.Sequelize.DECIMAL, //  to be calculated according to lineItem price*quantity
    allowNull: true, // change to false in the future
    validate: {
      isDecimal: true
    }
  },
}, {
  hooks: {
    // afterValidate(order){
    //   console.log(this.associations)
    //   order.total = this.associations.Item.reduce((total, item) => {return total += item.cost}, 0).toFixed(2)
    // }
  }
});

module.exports = Order;

