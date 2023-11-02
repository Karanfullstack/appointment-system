const express = require("express");
const {
	loginController,
	registerController,
} = require("../controllers/userController");

// Router Object
const router = express.Router();

// Login Route || POST /api/user/login
router.post("/login", loginController);

// Register Route || POST /api/user/register
router.post("/register", registerController);

module.exports = router;
