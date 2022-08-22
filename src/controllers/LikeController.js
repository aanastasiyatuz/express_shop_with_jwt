const Like = require("../models/Like");
const Product = require("../models/Product");

const toggleLike = async (req, res) => {
    const productId = req.params.id;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);

    if (!product) {
        return res.status(404).send("product not found")
    }
    console.log(req.user);
    const like = await Like.findOne({ where: { userId, productId } });

    if (like) {
        await Like.destroy({ where: { id: like.id } })
        res.status(204).send("like deleted")

    } else {
        await Like.create({ userId, productId })
        res.status(201).send("like created");
    }
};


module.exports = {
    toggleLike,
}