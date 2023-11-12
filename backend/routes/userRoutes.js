const express = require("express");
const AuthController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Router Object
const router = express.Router();

// Register Route || POST /api/user/register
router.post("/register", AuthController.registerUser);
// Login Route || POST /api/user/login
router.post("/login", AuthController.loginUser);
// Authenticate User Route || GET /api/user/auth
router.get("/auth", authMiddleware, AuthController.AuthenticateUser);

module.exports = router;
