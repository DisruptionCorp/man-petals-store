const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const { Product, Review, LineItem, User } = require('../../db/index');

//routes begin with /api/products/

//all products
router.get('/', (req, res, next) => {
  Product.findAll({
      include: [{
        model: Review,
        include: [User],
      }, ],
    })
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

//get product by id
router.get('/:id', (req, res, next) => {
  Product.findOne({
      where: { id: req.params.id },
      include: [{
        model: Review,
        include: [User],
      }, ],
    })
    .then(data => res.send(data))
    .catch(next);
});

//add product
router.post('/', (req, res, next) => {
  console.log('NEW PRODUCT ADDED:', req.body)
  Product.create(req.body)
    .then(product => res.send(product))
    .catch(next);
});

//delete product, send back all products
router.post('/:id', async(req, res, next) => {
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
  // tags will come in as a space delimited string and casing may be off
  // tags stored in the db are all Capitalized, 
  // so before sending them in for a search, they have to be Capitalized as well
  const tags = req.body.tags.split(' ').reduce((acc, each) => {
    each = each.charAt(0).toUpperCase() + each.slice(1)
    return [...acc, each];
  }, [])

  Product.findAndCountAll({
      where: {
        tags: {
          [Op.contains]: tags,
        },
      },
    })
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

//pagination count
router.get('/page/:index', async(req, res, next) => {
  let index = 0;
  let limit = 12;

  if (req.params.index) {
    index = req.params.index * 1 - 1;
  }
  Product.findAndCountAll({ offset: index * limit, limit })
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

module.exports = router;
