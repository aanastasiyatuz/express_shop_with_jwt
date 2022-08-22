const Router = require("express");
const router = new Router();
const productController = require("../controllers/ProductController.js");
const adminMiddleware = require("../middlewares/AdminMiddleware");


router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", adminMiddleware, productController.addProduct);
router.patch("/:id", adminMiddleware, productController.updateProduct);
router.delete("/:id", adminMiddleware, productController.deleteProduct);

module.exports = router;