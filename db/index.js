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

//Seed function
const seed = () => {
  return Promise.all([
    User.create({
      name: 'kevin',
      email: 'k.gmail.com',
      password: 'KEVIN',
      admin: true,
    }),
    User.create({
      name: 'daniel',
      email: 'd.gmail.com',
      password: 'DANIEL',
      admin: true,
    }),
    User.create({
      name: 'andrew',
      email: 'a.gmail.com',
      password: 'ANDREW',
      admin: true,
    }),
    User.create({
      name: 'sanjai',
      email: 's.gmail.com',
      password: 'SANJAI',
      admin: true,
    }),
    User.create({ name: 'moe', email: 'm.gmail.com', password: 'MOE' }),
    User.create({ name: 'larry', email: 'l.gmail.com', password: 'LARRY' }),
    User.create({ name: 'curly', email: 'c.gmail.com', password: 'CURLY' }),
  ])
    .then(([kevin, daniel, andrew, sanjai, moe, larry, curly]) => {
      return Promise.all([
        Product.create({ name: 'gloves', price: 19.99 }),
        Product.create({ name: 'rope', price: 19.99 }),
        Product.create({ name: 'axe', price: 19.99 }),
        Product.create({ name: 'bodybag', price: 19.99 }),
        Order.create({ status: 'ORDER', userId: kevin.id }),
        Order.create({ status: 'ORDER', userId: daniel.id }),
        // Order.create({ status: 'CART', userId: andrew.id})
      ]);
    })
    .then(([gloves, rope, axe, bodybag, order1, order2]) => {
      return Promise.all([
        LineItem.create({ orderId: order1.id, productId: rope.id }),
        LineItem.create({ orderId: order2.id, productId: bodybag.id }),
        LineItem.create({ orderId: order2.id, productId: axe.id }),
        LineItem.create({ orderId: order2.id, productId: gloves.id }),
      ]);
    })
    .catch(err => console.log(err));
};

//Sync function
const sync = () => {
  return conn.sync({ force: true });
};

module.exports = { conn, Product, Order, LineItem, User, Review, seed, sync };
