const express = require('express');
const router = express.Router();
const { Product, Review, LineItem, User } = require('../../db/index')


//routes begin with /api/product/

//all products
router.get('/', (req, res, next) => {
    Product
        .findAll({ include: [  Review ]})
        .then(products => { res.send(products) })
        .catch(next)
})

//add product
router.post('/', (req, res, next) => {
    const { name } = req.body
    Product
        .create({ name })
        .then(product => res.json(product))
        .catch(next)
})


//delete product, send back all products
router.post('/:id', async (req, res, next) => {
    await Product
        .destroy({
            where: {
                id: req.params.id
            }
        })
    await Product
        .findAll()
        .then(products => { res.send(products) })
        .catch(next)
})

//update product
router.put('/:id', (req, res, next) => {
    Product
        .findById(req.params.id)
        .then(product => product.update(req.body))
        .then(product => res.send(product))
        .catch(next)
})

//search products by tags
router.post('/search', (req, res, next) => {
  const Op = Sequelize.Op;
  console.log(req.body.tags)
  /*Product
        .findAll({ where: {
          tags: {
            [Op.contains] : {
                ...req.body.tags.reduce((acc,each)=>{
                  return {...acc, [Op.like]: '%'+each+'%'}
                }, {})
            }
          }
        }})
        .then(products => {
          console.log(products)
          if(products) res.send(products)
        })
        .catch(next);*/
})


module.exports = router
