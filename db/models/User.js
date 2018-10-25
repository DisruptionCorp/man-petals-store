const conn = require('../conn');

const User = conn.define('User', {
    Name: {
        type: conn.Sequelize.STRING
    },
    Username: {
        type: conn.Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: conn.Sequelize.STRING
    }
})

module.exports = User;