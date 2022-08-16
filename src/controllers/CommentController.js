const Comment = require("../models/Comment");
const Product = require("../models/Product");
const isAuthor = require("../utils/isAuthor");

const addComment = (req, res) => {
    const p_id = req.params.id;
    const u_id = req.user.id;
    const data = req.body;

    if (!data.body) {
        return res.status(400).send("body is required");
    }

    Product.findByPk(p_id)
        .then((product) => {
            if (!product) {
                return res.status(404).send("product not found")
            }

            Comment.create({ userId: u_id, productId: p_id, body: data.body })
                .then((comment) => {
                    res.status(201).json(comment);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500)
                });

        }).catch((error) => {
            console.log(error);
            res.status(500);
        });
};

const updateComment = (req, res) => {
    const id = req.params.id;
    const data = req.body

    Comment.findByPk(id)
        .then((comment) => {
            if (!comment) {
                return res.status(404).send("comment not found");
            }

            if (isAuthor(req, res, comment)) {
                Comment.update({ body: data.body }, { where: { id } })
                    .then(() => {
                        res.status(201).send("comment updated");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500);
                    });
            } else {
                res.status(403).send("Forbidden");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
}

const deleteComment = (req, res) => {
    const id = req.params.id;

    Comment.findByPk(id)
        .then((comment) => {
            if (!comment) {
                return res.status(404).send("comment not found");
            }

            if (isAuthor(req, res, comment)) {
                Comment.destroy({ where: { id } })
                    .then(() => {
                        res.status(204).send("comment deleted");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.status(500);
                    });
            } else {
                res.status(403).send("Forbidden");
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
}

module.exports = {
    addComment,
    updateComment,
    deleteComment
}