const notificationService = require("../services/notificaitonService");

class NotificationController {
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
}

module.exports = NotificationController;
