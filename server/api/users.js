const express = require('express');
const router = express.Router();
const { Product, Order, LineItem, User, Review } = require('../../db/index');


//routes begin with /api/users/

//all users
router.get('/', (req, res, next) => {
  User.findAll({ include: [Order, Review]})
    .then(users => {
      res.send(users);
    })
    .catch(next);
});

//add user
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(next);
});

//get user by id
router.get('/:id', (req, res, next) => {
  User.findOne({ include: [Order, Review] },
               { where: { id: req.params.id }})
               .then(user => {
                console.log(user)
                 res.send(user)
               })
               .catch(next);
});

//delete user, send back all users
router.delete('/:id', (req, res, next) => {
  User.destroy({
      where: {
        id: req.params.id,
      },
    })
    .then(() => res.sendStatus(404).end())
    .catch(next);
});

//update user
router.put('/:id', (req, res, next) => {
  User
      .update(req.body, 
            { where: { id: req.params.id}, 
            returning: true, 
            plain: true})
      .then(([ numRows, updated ]) => { 
        res.send(updated)
      })
      .catch(next);
});

module.exports = router;
