const { Op } = require("sequelize");

const Product = require("../models/Product");

const { generateFileName, deleteFile, createFile } = require("../utils/files");
const ProductSerializer = require("../serializers/ProductSerializer");


const getProducts = async (req, res) => {
    let { page, q } = req.query
    page = page || 1;
    const limit = 5;
    const offset = page * limit - limit;

    // pagination
    let options = {
        limit,
        offset
    };

    // search
    if (q) {
        options.where = {
            title: {
                [Op.iLike]: "%" + q.toLowerCase() + "%"
            }
        }
    };

    let products = await ProductSerializer(options, many = true, count = true)
    products.page = +page

    res.status(200).json(products);
};

const getProduct = async (req, res) => {
    const id = req.params.id;
    let options = {
        where: { id }
    }

    const product = await ProductSerializer(options);
    res.status(200).json(product)
};

const addProduct = (req, res) => {
    const data = req.body;
    const files = req.files;

    if (!data.title) {
        return res.status(400).send("title is required");
    };

    if (files && files.image) {
        const [name, fullName] = generateFileName(files.image.name);
        data.image = fullName;
        createFile(name, files.image.data);
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

const updateProduct = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const files = req.files;

    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).send("product not found");
    };

    if (files && files.image) {
        try {
            deleteFile(product.image);
        } catch (err) {
            console.log(err);
        };

        const [name, fullName] = generateFileName(files.image.name);
        data.image = fullName;
        createFile(name, files.image.data);
    };

    await Product.update(data, { where: { id } })
    res.status(201).send("product updated");
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;

    const product = Product.findByPk(id);
    if (!product) {
        return res.status(404).send("product not found");
    };

    if (product.image) {
        try {
            deleteFile(product.image);
        } catch (err) {
            console.log(err);
        };
    };

    await Product.destroy({ where: { id } });
    res.status(204).send("product deleted");
};

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}