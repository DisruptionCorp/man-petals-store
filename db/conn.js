const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.URL_DATABASE, { logging: true });

module.exports = conn;
