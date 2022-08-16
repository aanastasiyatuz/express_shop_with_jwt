const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Product = require("./Product");

const Comment = sequelize.define("comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  body: { type: DataTypes.TEXT},
});

Comment.belongsTo(User, { onDelete: 'cascade', hooks: true })
User.hasMany(Comment)

Comment.belongsTo(Product, { onDelete: 'cascade', hooks: true })
Product.hasMany(Comment)

module.exports = Comment;