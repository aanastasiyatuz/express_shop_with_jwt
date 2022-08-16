const Router = require("express");
const router = new Router();
const commentController = require("../controllers/CommentController.js");
const authMiddleware = require("../middlewares/AuthMiddleware");


router.post("/:id", authMiddleware, commentController.addComment);
router.patch("/:id", authMiddleware, commentController.updateComment);
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;