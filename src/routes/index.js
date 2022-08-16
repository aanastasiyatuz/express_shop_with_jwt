const Router = require("express");
const userRoutes = require("./UserRoutes");
const productRoutes = require("./ProductRoutes");
const commentRoutes = require("./CommentRoutes");

const router = new Router();
router.use("/account", userRoutes);
router.use("/products", productRoutes);
router.use("/comments", commentRoutes);

module.exports = router;