const User = require("../../models/userModels");
const Doctor = require("../../models/doctorModels");

class AdminService {
	// Get All Users List
	static async getAllUsers() {
		try {
			const users = await User.find({isAdmin: {$ne: "true"}}).select(
				"-password"
			);
			return users;
		} catch (error) {
			throw error;
		}
	}

	// Get All Doctors List
	static async getAllDoctors() {
		try {
			const doctors = await Doctor.find({});
			return doctors;
		} catch (error) {
			throw error;
		}
	}

	// Approved Doctor Status
	static async approveDoctorService(doctorId, status) {
		try {
			// Updating Doctor Status
			const doctor = await Doctor.findByIdAndUpdate(
				doctorId,
				{status},
				{new: true}
			);

			// Sending Notification To User
			const user = await User.findById(doctor.userId);
			const notification = user.notification;

			notification.push({
				type: "Your-doctor-request-updated",
				message: `Your Doctor Account Request Has ${status}`,
				onClick: "/notification",
			});
			user.isDoctor = doctor.status === "approved" ? true : false;
	
			await user.save();

			return doctor;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = AdminService;
