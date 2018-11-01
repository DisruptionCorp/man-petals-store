const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple')
const { User } = require('../../db')
module.exports = router;

// // persist session
// router.get('/', (req, res, next) => {
//   const id = req.session.userId;
//   if(!id){ return res.sendStatus(401) } //access denied or unauthorized error
//   User
//     .findById(id)
// 	.then(user => res.send(user))
// 	.catch(next);
// });

// // delete session
// router.delete('/', (req, res, next) => {
//   req.session.destroy(); // or req.session = null;
//   res.sendStatus(204); // no content
// })

// begin session
router.post('/', (req, res, next) => {
	User.findOne({ 
    where: {
      email: req.body.email, 
      password: req.body.password
    } 
  })
  .then( user => {
    if (!user) {
      return next({ status: 401 })
    }
    const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET)
    res.send({ token })
  })
	.catch(next)
})


router.get('/', (req, res, next)=> {
  if (!req.user){
    console.log('no user')
    return next({ status: 401 })
  }
  res.status(200).send(req.user);
})