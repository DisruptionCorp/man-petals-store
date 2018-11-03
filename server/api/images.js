const express = require('express');
const router = express.Router();
const { Image } = require('../../db');

router.get('/', (req, res, next) => {
  Image.findAll()
    .then(images => res.send(images))
    .catch(next);
});

router.get(':id', (req, res, next) => {
  Image.findById(req.params.id)
    .then(image => {
      const { data } = image;
      //const regex = /data:image\/(\w+);base64,(.*)/
      const extensions = data.split(';')[0].split('/');
      const extension = extensions[extensions.length - 1];
      const body = new Buffer(
        data.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );
      res.contentType(`image/${extension}`);
      res.send(body);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Image.upload(req.body.data, config.bucket)
    .then(image => res.send(image))
    .catch(next);
});
