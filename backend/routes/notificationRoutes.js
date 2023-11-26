const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const AuthMiddleware = require("../middlewares/authMiddleware");

router.put("/read", AuthMiddleware, notificationController.getNotifications);

module.exports = router;
