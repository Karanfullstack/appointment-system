const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const AuthMiddleware = require("../middlewares/authMiddleware");

router.put("/read", AuthMiddleware, notificationController.getNotifications);
router.put("/clear", AuthMiddleware, notificationController.clearNotifications);
module.exports = router;
