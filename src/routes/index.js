const Router = require("express");
const userRoutes = require("./UserRoutes");
const productRoutes = require("./ProductRoutes");
const commentRoutes = require("./CommentRoutes");
const ratingController = require("../controllers/RatingController");
const likeController = require("../controllers/LikeController");
const authMiddleware = require("../middlewares/AuthMiddleware");


const router = new Router();
router.use("/account", userRoutes);
router.use("/products", productRoutes);
router.use("/comments", commentRoutes);
router.get("/toggle-like/:id", authMiddleware, likeController.toggleLike);
router.post("/add-rating/:id", authMiddleware, ratingController.addRating);

module.exports = router;