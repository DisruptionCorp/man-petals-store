const express = require('express');
const router = express.Router();
const { Order, LineItem, User, Product } = require('../../db/index');
module.exports = router;

/////ORDERS/////

// get all orders
router.get('/', (req, res, next) => {
  Order.findOrCreate({ where: { status: 'CART' } })
    .then(() => {
      Order.findAll({
        include: [
          {
            model: LineItem,
            as: 'Item',
            include: [Product]
          },
          User,
        ],
      })
      .then(orders => {
        res.send(orders)
      })
    })
    .catch(next);
});

// get order by id
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { 
    include: [{ 
      model: LineItem, 
      as: 'Item',
      include: [Product]
    }] })
    .then(order => res.send(order))
    .catch(next);
});

// create an order
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .catch(next);
});

// delete order
router.delete('/:id', (req, res, next) => {
  Order.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then(() => Order.findAll())
  .then(orders => res.send(orders))
  .catch(next);
});

// update order
router.put('/:id', (req, res, next) => {
  Order.update(req.body, {
    where: { id: req.params.id },
    returning: true,
    plain: true,
  })
    .then(([numRows, updated]) => {
      res.send(updated);
    })
    .catch(next);
});
