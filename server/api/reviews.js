const express = require('express');
const router = express.Router();
const { Review, Product, User } = require('../../db');

// create a review for a product
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => {
      res.send(review);
    })
    .catch(next);
});

// delete a review by id
router.delete('/:id', (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(404).end())
    .catch(next);
});

// update a review by id
router.post('/:id', (req, res, next) => {
  Review.update(req.body, {
    where: { id: req.params.id },
    returning: true,
    plain: true,
  })
    .then(([numRows, updated]) => {
      res.send(updated);
    })
    .catch(next);
});

module.exports = router;
