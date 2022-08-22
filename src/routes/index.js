const Router = require("express");
const userRoutes = require("./UserRoutes");
const productRoutes = require("./ProductRoutes");
const commentRoutes = require("./CommentRoutes");
const ratingController = require("./RatingRoutes");

const router = new Router();
router.use("/account", userRoutes);
router.use("/products", productRoutes);
router.use("/comments", commentRoutes);
router.use("/ratings", ratingController);

module.exports = router;