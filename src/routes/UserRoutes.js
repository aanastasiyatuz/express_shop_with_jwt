const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController.js");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/register-staff", userController.createStaffUser);
router.post("/register", userController.registration);
router.post("/login", userController.login);
router.get("/check", authMiddleware, userController.check);

module.exports = router;