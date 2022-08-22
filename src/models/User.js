const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  is_staff: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = User;