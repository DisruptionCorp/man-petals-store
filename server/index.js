const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const userRouter = require('./routes/api/users');
const productRouter = require('./routes/api/products')
const port = process.env.PORT || 3000;
const path = require('path');
const { conn, seed } = require('../db/index')

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json())

app.use('/api/products', productRouter)
app.use('/api/users', userRouter);

sync()
  .then(() => {
    console.log('Database synced..')
    seed()
  })
  .then(() => {
    console.log('Database seeded..')
    app.listen(port, () => {
      console.log("it's....")
      setTimeout(() => {
        console.log('....alive.');
      }, 3000);
    });
  })
  .catch(err => console.log(err))
