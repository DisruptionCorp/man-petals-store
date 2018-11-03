const conn = require('./conn');
const Product = require('./models/Product');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');
const User = require('./models/User');
const Review = require('./models/Review');

//Associations
Order.hasMany(LineItem, { as: 'Item' });
LineItem.belongsTo(Order);

Product.hasMany(LineItem);
LineItem.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

//Sync function
const sync = () => {
  return conn.sync({ force: true });
};

module.exports = { conn, Product, Order, LineItem, User, Review, sync };
