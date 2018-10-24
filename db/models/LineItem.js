const db = require('./conn');

const LineItem = db.define('lineItem', {
  quantity: {
    type: db.Sequelize.INTEGER,
    defaultValue: 1,
  },
});

module.exports = LineItem;
