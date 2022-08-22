const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Product = require("./Product");

const Like = sequelize.define("like", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
});

Like.belongsTo(User, { onDelete: 'cascade', hooks: true })
User.hasMany(Like)

Like.belongsTo(Product, { onDelete: 'cascade', hooks: true })
Product.hasMany(Like)

module.exports = Like;