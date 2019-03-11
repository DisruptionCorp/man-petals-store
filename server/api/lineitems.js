const express = require('express');
const router = express.Router();
const { LineItem, Order, Product } = require('../../db');

// create line items
router.post('/:orderId', (req, res, next) => {
  LineItem.create(req.body.lineItem)
    .then(lineItem => res.send(lineItem))
    .catch(next);
})

// delete line items
router.delete('/:orderId/:id', async (req, res, next) => {
  // 
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.id,
    },
  })
  .then(() => res.sendStatus(204))
  .catch(next);
})

// update line items
router.put('/:id', (req, res, next)=> {
  const { lineItem, orderId } = req.body;
  // there isn't a great way to include an associated model's information it seems
  // so I've updated lineitem by params id passed in first
  LineItem.findOne({
    where: {
      id: req.params.id,
      orderId
    },
    include: [Product]
  })
  // the includes hook to grab an associated model only works with certain 'find' queries
  // so I am then searching the db for the updated, including the assoc model
  .then(item => item.update(lineItem))
  .then(item => {
    res.send(item)
  })
  .catch(next);
  });

module.exports = router;