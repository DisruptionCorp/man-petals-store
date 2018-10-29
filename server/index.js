const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require('./api/users');
const productRouter = require('./api/products');
const orderRouter = require('./api/orders');
const lineItemsRouter = require('./api/lineitems');
const port = process.env.PORT || 3000;
const path = require('path');
const { sync, seed } = require('../db/index');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/lineitems', lineItemsRouter);

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

