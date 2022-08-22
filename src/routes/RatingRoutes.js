const Router = require("express");
const router = new Router();
const ratingController = require("../controllers/RatingController.js");
const authMiddleware = require("../middlewares/AuthMiddleware");


router.post("/:id", authMiddleware, ratingController.addRating);
router.delete("/:id", authMiddleware, ratingController.deleteRating);

module.exports = router;