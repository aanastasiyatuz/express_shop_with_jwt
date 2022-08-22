const Rating = require("../models/Rating");
const Product = require("../models/Product");
const isAuthor = require("../utils/isAuthor");

const addRating = (req, res) => {
    const p_id = req.params.id;
    const u_id = req.user.id;
    const data = req.body;

    if (!data.value) {
        return res.status(400).send("value is required");
    } else if (!(+data.value in [1, 2, 3, 4, 5])) {
        return res.status(400).send("invalid value for rating")
    }

    Product.findByPk(p_id)
        .then((product) => {
            if (!product) {
                return res.status(404).send("product not found")
            }
            console.log(product);
            Rating.findOne({ userId: u_id, productId: p_id })
                .then((rating) => {
                    if (rating) {
                        Rating.update({ value: data.value }, { where: { id: rating.id } })
                            .then(() => {
                                res.status(201).send("rating updated")
                            }).catch((error) => {
                                console.log(error);
                                res.status(500);
                            })
                    } else {
                        Rating.create({ userId: u_id, productId: p_id, value: data.value })
                            .then((Rating) => {
                                res.status(201).json(Rating);
                            })
                            .catch((error) => {
                                console.log(error);
                                res.status(500)
                            });
                    }
                })

        }).catch((error) => {
            console.log(error);
            res.status(500);
        });
};


const deleteRating = (req, res) => {
    const id = req.params.id;

    Rating.findByPk(id)
        .then((Rating) => {
            if (!Rating) {
                return res.status(404).send("Rating not found");
            }

            if (isAuthor(req, res, Rating)) {
                Rating.destroy({ where: { id } })
                    .then(() => {
                        res.status(204).send("Rating deleted");
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
    addRating,
    deleteRating
}