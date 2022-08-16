const { Op } = require("sequelize");

const Product = require("../models/Product");
const Comment = require("../models/Comment");
const User = require("../models/User");

const API_URL = process.env.API_URL

const getProducts = (req, res) => {
    let { page, q } = req.query
    page = page || 1;
    const limit = 5;
    const offset = page * limit - limit;

    let options = {
        include: {
            model: Comment,
            attributes: ["id","body"],
            include: {
                model: User,
                attributes: ["id", "email"]
            }
        },
        limit,
        offset
    }

    if (q) {
        options.where = {
            title: {
                [Op.iLike]: "%" + q + "%"
            }
        }
    }

    Product.findAndCountAll(options)
        .then((products) => {
            products.page = +page
            products.next = `${API_URL}${req.baseUrl}?page=${+page+1}&q=${q || ""}`
            res.status(200).json(products);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
};

const getProduct = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then((product) => {
            if (!product) {
                res.status(404).send("product not found");
            } else {
                res.status(200).json(product);
            };
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
};

const addProduct = (req, res) => {
    const data = req.body;
    if (!data.title) {
        return res.status(400).send("title is required");
    };

    Product.create(data)
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
};

const updateProduct = (req, res) => {
    const data = req.body;
    const id = req.params.id;

    Product.findByPk(id)
        .then((product) => {
            if (!product) {
                return res.status(404).send("product not found");
            }
            Product.update(data, { where: { id } })
                .then(() => {
                    res.status(201).send("product updated");
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500);
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id)
        .then((product) => {
            if (!product) {
                return res.status(404).send("product not found");
            }
            Product.destroy({ where: { id } })
                .then(() => {
                    res.status(204).send("product deleted");
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500);
                });
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        });
};

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}