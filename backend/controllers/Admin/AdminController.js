const AdminService = require("../../services/Admin/AdminService");

class AdminController {
	// Get All Users List
	static async getAllUsers(req, res) {
		try {
			const users = await AdminService.getAllUsers();
			return res.status(200).json({success: true, users});
		} catch (error) {
			return res.status(500).json({success: false, error: error.message});
		}
	}

	// Get All Doctors List
	static async getAllDoctors(req, res) {
		try {
			const doctors = await AdminService.getAllDoctors();
			return res.status(200).json({success: true, doctors});
		} catch (error) {
			return res.status(500).json({success: false, error: error.message});
		}
	}
}

module.exports = AdminController;
