const express = require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const secret = process.env.JWT_SECRET || 'foo';
const path = require('path');
const jwt = require('jwt-simple');

// // Token is created using Checkout or Elements!
// // Get the payment token ID submitted by the form:
// const token = request.body.stripeToken; // Using Express

// const charge = stripe.charges.create({
//   amount: 999,
//   currency: 'usd',
//   description: 'Example charge',
//   source: token,
// });

//File Imports
const { sync, User } = require('../db/index');
const seed = require('../db/dev_seed');

//Router Imports
const usersRouter = require('./api/users');
const productsRouter = require('./api/products');
const ordersRouter = require('./api/orders');
const lineItemsRouter = require('./api/lineitems');
const reviewsRouter = require('./api/reviews');
const authRouter = require('./api/auth');
const imagesRouter = require('./api/images');
const stripeRouter = require('./api/stripe');

//Middleware
app.use(morgan('dev')); //logging
app.use(express.json({ limit: '10mb', extended: true })); //body-parsing
app.use(express.urlencoded({ limit: '10mb', extended: true })); //body-parsing
app.use(express.static(path.join(__dirname, '../public'))); //static
app.use('/public', express.static(path.join(__dirname, '../public'))); //static

//Token Authentication Middleware
app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }

  let id;
  try {
    id = jwt.decode(token, secret).id;
    User.findById(id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(next);
  } catch (ex) {
    next({ status: 401 });
  }
});

//Routers
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/lineitems', lineItemsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/auth', authRouter);
app.use('/api/images', imagesRouter);
app.use('/api/payment', stripeRouter);

//DB Sync
sync()
  .then(() => {
    console.log('Database synced..');
    seed();
  })
  .then(() => {
    console.log('Database seeded..');
    app.listen(port, () => {
      console.log("it's....");
      setTimeout(() => {
        console.log('....alive.');
      }, 500);
    });
  })
  .catch(err => console.log(err));

module.exports = app;
