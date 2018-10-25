const express = require('express');
const app = express();
const router = require('./api/users');
const productRouter = require('./server/api/products')
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(process.pwd(), 'public')));

app.use('/api/products', productRouter)
app.use('/api', router);

app.listen(port, () => {
   console.log('it\'s....')
   .then(()=>{ setTimeout(()=>{
   	console.log('....alive.')
   }, 2000)})
})