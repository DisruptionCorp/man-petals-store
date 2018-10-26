const express = require('express');
const router = express.Router();
const { Order, LineItem, User, Review } = require('../../db/index');
module.exports = router;

// get all orders
router.get('/', (req, res, next) => {
    Order
        .findAll()
        .then(orders => res.send(orders))
        .catch(next);
});

// get order by id
router.get('/:id', (req, res, next) => {
    Order
        .findById(req.params.id)
        .then(order => res.send(order))
        .catch(next);
});

// create an order
router.post('/:id/lineItems', (req, res, next) => {
    Order
    	.create(req.body)
    	.then(order => res.send(order))
    	.catch(next);
});

// delete order
router.post('/:id/delete', (req, res, next) => {
    Order
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .findAll()
        .then(orders => res.send(orders))
        .catch(next);
});

// update order
router.put('/:id', (req, res, next) => {
  Order
  	  .findById(req.params.id)
      .then(order => { user.update(req.body)})
      .then(order => res.send(order))
      .catch(next);
});