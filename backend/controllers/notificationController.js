const notificationService = require("../services/notificaitonService");

class NotificationController {
	// Mark all notification as read controller
	static async getNotifications(req, res) {
		try {
			const userId = req.user.id;
			const notification = await notificationService.readNotification(userId);
			return res.status(200).json(notification);
		} catch (error) {
			console.log(error);
			res.status(500).json({message: error.message});
		}
	}

	// Clear all notification controller
	static async clearNotifications(req, res) {
		try {
			const userId = req.user.id;
			const response = await notificationService.clearNotification(userId);
			res.status(200).json({success: true, message: "Clear all notification"});
		} catch (error) {
			console.log(error);
			res.status(500).json({message: error.message});
		}
	}
}

module.exports = NotificationController;
