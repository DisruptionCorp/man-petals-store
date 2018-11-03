const S3 = require('../S3');

const conn = require('../conn');
const Image = conn.define('image', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true,
  },
  url: {
    type: conn.Sequelize.STRING,
  },
});

Image.upload = async function(data, bucketName = 'disruptcorpflowers') {
  try {
    const regex = /data:image\/(\w+);base64,(.*)/;
    const matches = regex.exec(data);
    const extension = matches[1];

    const image = this.build();
    const Body = new Buffer(matches[2], 'base64');
    await S3.createBucket({ Bucket: bucketName }).promise();
    const Key = `${image.id.toString()}.${extension}`;

    await S3.putObject({
      Bucket: bucketName,
      ACL: 'public-read',
      Body,
      ContentType: `image/${extension}`,
      Key,
    }).promise();

    image.url = `https://s3.amazonaws.com/${bucketName}/${Key}`;
    const imageInstance = await image.save();

    return imageInstance;
  } catch (ex) {
    throw ex;
  }
};
module.exports = Image;
