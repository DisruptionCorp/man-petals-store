const express = require('express');
const router = express.Router();
const { LineItem, Order, Product } = require('../../db');

// // get by productId
// router.get('/:orderId/:productId', (req, res, next) => {
//   const { productId, orderId } = req.params;
//   LineItem.findOne({
//     where: {
//       productId,
//       orderId
//     }
//   })
//   .then(item => {
//     console.log(item)
//     res.send(item)
//   })
//   .catch(next)
// })
// create line items
router.post('/:orderId', (req, res, next) => {
  // const { orderId } = req.params;
  // const { productId } = req.body;
  // const product = await Product.findById(productId)
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
    // there isn't a great way to include an associated model's information it seems
    // so I've updated lineitem by params id passed in first
    LineItem.findById(req.params.id, {
      include: [{ model: Product }]
    })
    // the includes hook to grab an associated model only works with certain 'find' queries
    // so I am then searching the db for the updated, including the assoc model
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next);
  });

module.exports = router;