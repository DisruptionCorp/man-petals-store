const express = require('express');
const router = express.Router();
const { Order, LineItem, User, Product, Review } = require('../../db/index');
module.exports = router;

/////LINEITEMS/////

// create a lineItem
router.post('/:id/lineItems/', (req, res, next) => {
  console.log('thereq.body when posting a lineItem is: ', req.body);
  LineItem.create({
    orderId: req.params.id,
    quantity: req.body.quantity,
    productId: req.body.productId,
  })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

//delete lineItem
router.delete('/:id/lineItems/:liId', (req, res, next) => {
  LineItem.destroy({
    where: {
      orderId: req.params.id,
      id: req.params.liId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

//update line item
router.put('/:id/lineItems/:liId', (req, res, next) => {
  LineItem.findById(req.params.liId)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

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
          },
          User,
        ],
      }).then(orders => res.send(orders));
    })
    .catch(next);
});

// get order by id
router.get('/:id', (req, res, next) => {
  Order.findById(req.params.id, { include: [{ model: LineItem, as: 'Item' }] })
    .then(order => {
      console.log(order);
      res.send(order);
    })
    .catch(next);
});

// create an order
router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.send(order))
    .catch(next);
});

// delete order
router.delete('/:id', async (req, res, next) => {
  await Order.destroy({
    where: {
      id: req.params.id,
    },
  });
  await Order.findAll()
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
