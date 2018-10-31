const express = require('express');
const router = express.Router();
module.exports = router;

// persist session
router.get('/', (req, res, next) => {
  const id = req.session.userId;
  if(!id){ return res.sendStatus(401) } //access denied or unauthorized error
  User
    .findById(id)
	.then(user => res.send(user))
	.catch(next);
});

// delete session
router.delete('/', (req, res, next) => {
  req.session.destroy(); // or req.session = null;
  res.sendStatus(204); // no content
})

// begin session
router.post('/', (req, res, next) => {
  const { user, password } = req.body;
  User
  	.findOne({ where: { email, password }})
  	.then(user => {
  	  if(!user) { return res.sendStatus(401) }
  	  req.session.userId = user.id;
  	  res.sendStatus(204); // no content
  	})
  	.catch(next);
})