const conn = require('../conn');
//const { LineItem } = require('../index');

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
    defaultValue: 0.00,
    validate: {
      isDecimal: true
    }
  },
}, /*{
  include: {
    model: LineItem,
    as: 'Item'
  }
},*/ {
  hooks: {
    afterValidate(order){
      if(order.total && order.total != 0) {
        order.total = order.total.toFixed(2)
      }
    }/*,
    afterUpdate(order){
      if(order.Item){
        order.total = order.Item.reduce((grandTotal, curr, idx)=>{grandTotal+=curr.cost}, 0)
      }
    }*/
  }
});

module.exports = Order;
