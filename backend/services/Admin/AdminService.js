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
}

module.exports = AdminService;
