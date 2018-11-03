const AWS = require('aws-sdk');

const { accessKeyId, secretAccessKey } = require('./config');

module.exports = new AWS.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
