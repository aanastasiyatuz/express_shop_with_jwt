const Router = require("express");
const router = new Router();
const productController = require("../controllers/ProductController.js");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", authMiddleware, productController.addProduct);
router.patch("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);

module.exports = router;