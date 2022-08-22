const Rating = require("../models/Rating");
const Product = require("../models/Product");

const addRating = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;
    const data = req.body;

    if (!data.value) {
        return res.status(400).send("value is required");
    } else if (!(+data.value in [1, 2, 3, 4, 5])) {
        return res.status(400).send("invalid value for rating")
    }

    const product = await Product.findByPk(productId);
    if (!product) {
        return res.status(404).send("product not found")
    }

    const rating = await Rating.findOne({ where: { userId, productId } })
    if (rating) {
        await Rating.update({ value: data.value }, { where: { id: rating.id } })
        res.status(201).send("rating updated")

    } else {
        await Rating.create({ userId, productId, value: data.value })
        res.status(201).send("rating created");
    }
};

module.exports = {
    addRating
}