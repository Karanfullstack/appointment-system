const express = require("express");
const AuthController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const blockUserMiddleware = require("../middlewares/blockUserMiddleware");
// Router Object
const router = express.Router();

// Register Route || POST /api/user/register
router.post("/register", AuthController.registerUser);
// Login Route || POST /api/user/login
router.post("/login", blockUserMiddleware, AuthController.loginUser);
// Authenticate User Route || GET /api/user/auth
router.get("/auth", authMiddleware, AuthController.AuthenticateUser);

// Updating User Profile Route || PUT /api/user/update
router.put("/update", authMiddleware, AuthController.updateUserProfile);
module.exports = router;
