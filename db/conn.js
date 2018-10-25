const Sequelize = require('sequelize');
const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/graceshopper',
  { logging: true }
);

module.exports = conn;
