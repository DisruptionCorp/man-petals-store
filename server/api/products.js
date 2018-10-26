const express = require('express');
const router = express.Router();
const { Product, Order, LineItem, User } = require('../../db/index')


//routes begin with /api/product/

//all users
router.get('/', (req, res, next) => {
    Product
        .findAll()
        .then(products => { res.send(products) })
        .catch(next)
})

//add user
router.post('/', (req, res, next) => {
    const { name } = req.body
    Product
        .create({ name })
        .then(product => res.json(product))
        .catch(next)
})


//delete user, send back all users
router.post('/:id', (req, res, next) => {
    Product
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .findAll()
        .then(products => { res.send(products) })
        .catch(next)
})

//update user
router.put('/:id', (req, res, next) => {
    User
        .findById(req.params.id)
        .then(user => { user.update(req.body) })
        .then(user => { res.send(user) })
        .catch(next)
})


module.exports = router
