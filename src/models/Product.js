const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING }
});

module.exports = Product;