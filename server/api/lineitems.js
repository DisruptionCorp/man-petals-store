const express = require('express');
const router = express.Router();
const { LineItem, Order, Product } = require('../../db');


// create line items
router.post('/', (req, res, next) => {
  LineItem
  		.findOrCreate(req.body)
  		.then(item => {
  		  res.send(item)
  		});
})

// delete line items
router.post('/:id', async (req, res, next) => {
  await LineItem
        .destroy({
            where: {
                id: req.params.id
            }
        })
  await LineItem.findAll()
        .then(lineitems => { res.send(lineitems) })
        .catch(next)
})

// update line items
router.put('/:id', (req, res, next)=> {
    LineItem
		.update(req.body, { 
			    where: { id: req.params.id }, 
  	  		    returning: true, 
  	  		    plain: true
  	  		    })
        .then(([ numRows, updated ]) => { 
      	  res.send(updated)
        })
        .catch(next);
  });

module.exports = router;