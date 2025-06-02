const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
      max: 10,       // 최대 커넥션 수
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: false,  // 쿼리 로그를 보고 싶으면 true로 바꾸세요
  }
);

module.exports = sequelize;