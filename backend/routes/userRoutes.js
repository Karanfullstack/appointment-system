const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const AuthController = require("../controllers/userController");

// Router Object
const router = express.Router();

// Register Route || POST /api/user/register
router.post("/register", AuthController.registerUser);
// Login Route || POST /api/user/login
router.post("/login", AuthController.loginUser);

module.exports = router;
