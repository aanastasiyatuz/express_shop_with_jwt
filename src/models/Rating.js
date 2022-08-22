const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Product = require("./Product");

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.INTEGER, enum: [1,2,3,4,5]},
});

Rating.belongsTo(User, { onDelete: 'cascade', hooks: true })
User.hasMany(Rating)

Rating.belongsTo(Product, { onDelete: 'cascade', hooks: true })
Product.hasMany(Rating)

module.exports = Rating;