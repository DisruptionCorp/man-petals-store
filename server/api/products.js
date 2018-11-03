const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const { Product, Review, LineItem, User } = require('../../db/index');

//routes begin with /api/product/

//all products
router.get('/', (req, res, next) => {
  Product.findAll({ include: [Review] })
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

//add product
router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

//delete product, send back all products
router.post('/:id', async (req, res, next) => {
  await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  await Product.findAll().then(products => {
    res.send(products);
  });
});

//delete product
router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

//update product
router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(product => res.send(product))
    .catch(next);
});

//search products by tags
router.post('/search/tags/:index?', (req, res, next) => {
  const Op = Sequelize.Op;
  let index = 0;
  let limit = 4;
  if (req.params.index) {
    index = req.params.index * 1 - 1;
  }
  let offset = index*limit;
  Product.findAndCountAll({
    where: {
      tags: {
        [Op.contains]: [
          ...req.body.tags.reduce((acc, each) => {
            console.log(each);
            return [...acc, each];
          }, []),
        ],
      },
    },
    offset,
    limit
  })
    .then(products => {
        res.send(products);
    })
    .catch(next);
});

//pagination count
router.get('/page/:index', async (req, res, next) => {
  let index = 0;
  let limit = 4;
  
  if (req.params.index) {
    index = req.params.index * 1 - 1;
  }
  Product
    .findAndCountAll({ offset: index * limit, limit: 4 })
    .then(products => {
      // products.rows = await Math.ceil(products.rows/limit);
      res.send(products)
      })
    .catch(next);
});


module.exports = router;
