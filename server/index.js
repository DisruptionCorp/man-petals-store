const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const path = require('path');
const session = require('express-session');


//File Imports
const { sync, seed } = require('../db/index');


//Router Imports
const userRouter = require('./api/users');
const productRouter = require('./api/products');
const orderRouter = require('./api/orders');
const lineItemsRouter = require('./api/lineitems');
const reviewsRouter = require('./api/reviews');
const authRouter = require('./api/auth');


//Middleware
app.use(morgan('dev'));     //logging
app.use(express.json());    //body-parsing
app.use(express.urlencoded());      //body-parsing   
app.use(session({                           //session
  secret: 'keep it secret, keep it safe',
  resave: false,
  saveUninitialized: false
}));  
app.use('/public', express.static(path.join(__dirname, '../public')));      //static     


//Routers
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/lineitems', lineItemsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/auth', authRouter);


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
      }, 1000);
    });
  })
  .catch(err => console.log(err))


module.exports = app;

