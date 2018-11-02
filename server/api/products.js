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
  await Product.findAll()
    .then(products => {
      res.send(products);
    })
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
router.post('/search/tags', (req, res, next) => {
  const Op = Sequelize.Op;

  Product.findAll({
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
  })
    .then(products => {
      if (products) res.send(products);
    })
    .catch(next);
});

module.exports = router;
