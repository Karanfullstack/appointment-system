const User = require("../models/userModels");

class notificationService {
	static async readNotification(userId) {
		try {
			const user = await User.findOne({_id: userId});
			let notification = user.notification;
			let seennotification = user.seennotification;
			seennotification.push(...notification);
			user.notification = [];
			await user.save();
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}

	// Clear all notification
	static async clearNotification(userId) {
		try {
			const user = await User.findById(userId);
			user.seennotification = [];
			await user.save();
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = notificationService;
