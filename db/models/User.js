const conn = require('../conn');
const User = conn.define('user', {
  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;

