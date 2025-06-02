const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConnect.js');  // 위에서 만든 파일 경로 맞게

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "전화번호는 꼭 기입해 주세요.",
      },
    },
  },
}, {
  timestamps: true,
});

module.exports = Contact;