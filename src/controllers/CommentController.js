const Comment = require("../models/Comment");
const Product = require("../models/Product");
const isAuthor = require("../utils/isAuthor");

const addComment = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id;
    const data = req.body;

    if (!data.body) {
        return res.status(400).send("body is required");
    }

    const product = await Product.findByPk(productId)
    if (!product) {
        return res.status(404).send("product not found")
    }

    const comment = await Comment.create({ userId, productId, body: data.body })
    res.status(201).json(comment);
};

const updateComment = async (req, res) => {
    const id = req.params.id;
    const data = req.body

    const comment = await Comment.findByPk(id);
    if (!comment) {
        return res.status(404).send("comment not found");
    }

    if (isAuthor(req, res, comment)) {
        await Comment.update({ body: data.body }, { where: { id } })
        res.status(201).send("comment updated");

    } else {
        res.status(403).send("Forbidden");
    }

}

const deleteComment = async (req, res) => {
    const id = req.params.id;

    const comment = await Comment.findByPk(id)
    if (!comment) {
        return res.status(404).send("comment not found");
    }

    if (isAuthor(req, res, comment)) {
        await Comment.destroy({ where: { id } })
        res.status(204).send("comment deleted");

    } else {
        res.status(403).send("Forbidden");
    }

}

module.exports = {
    addComment,
    updateComment,
    deleteComment
}