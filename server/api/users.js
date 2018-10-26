const express = require('express');
const router = express.Router();
const { Product, Order, LineItem, User } = require('../../db/index');


//routes begin with /api/users/

//all users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
    .catch(next);
});

//add user
router.post('/', (req, res, next) => {
  const { name } = req.body;
  User.create({ name })
    .then(user => res.json(user))
    .catch(next);
});

//delete user, send back all users
router.post('/:id', (req, res, next) => {
  User.destroy({
      where: {
        id: req.params.id,
      },
    })
    .findAll()
    .then(users => {
      res.send(users);
    })
    .catch(next);
});

//update user
router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      user.update(req.body);
    })
    .then(user => {
      res.send(user);
    })
    .catch(next);
});

module.exports = router;
