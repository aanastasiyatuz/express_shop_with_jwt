const Rating = require("../models/Rating");
const Product = require("../models/Product");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Like = require("../models/Like");

const getAvgRating = async (id) => {
    let ratings = await Rating.findAll({
        where: {
            productId: id
        }
    });
    let total = ratings.reduce((x, y) => (x.value ? x.value : x) + y.value, 0);
    let avg = total / ratings.length;
    return avg ? avg : 0
};

const getLikeCount = async (id) => {
    return await Like.count({ where: { productId: id } });
};

const ProductSerializer = async (options, many = false, count = false) => {
    options.include = {
        model: Comment,
        attributes: ["id", "body"],
        include: {
            model: User,
            attributes: ["id", "email"]
        }
    };
    options.attributes = ["id", "title", "image"]

    if (many) {
        let products;

        if (count) {
            products = await Product.findAndCountAll(options);
        } else {
            products = await Product.findAll(options);
        }

        products = JSON.parse(JSON.stringify(products));

        let newProducts = []
        for (let product of products.rows) {
            product.rating = await getAvgRating(product.id);
            product.likes = await getLikeCount(product.id);
            newProducts.push(product)
        }

        products.rows = newProducts
        return products;

    } else {
        let product = await Product.findOne(options);
        product = JSON.parse(JSON.stringify(product));
        product.rating = await getAvgRating(product.id);
        product.likes = await getLikeCount(product.id);
        return product;
    };
};

module.exports = ProductSerializer;