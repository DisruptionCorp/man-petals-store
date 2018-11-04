const express = require('express');
const router = express.Router();
const { Image } = require('../../db');
const config = require('../../db/config');

router.post('/', (req, res, next) => {
  Image.upload(req.body.data, config.bucket)
    .then(image => res.send(image))
    .catch(next);
});

module.exports = router;
