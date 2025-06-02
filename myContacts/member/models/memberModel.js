const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbConnect.js");

const Member = sequelize.define('Member', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Member;