const DoctorService = require("../../services/Doctor/DoctorService");

class DoctorController {
	// Getting current doctor
	static async getDoctorController(req, res) {
		try {
			const {id} = req.user;
			const doctor = await DoctorService.getDoctor(id);
			return res
				.status(200)
				.json({status: 200, message: "Doctor found", data: doctor});
		} catch (error) {
			return res.status(500).json({status: 500, message: error.message});
		}
	}

	// UPdating current doctor
	static async updateDoctorController(req, res) {
		try {
			const {id} = req.user;
			const doctor = req.body;
			const response = await DoctorService.updateDoctor(id, doctor);
			return res
				.status(200)
				.json({status: 200, message: "Doctor updated", data: response});
		} catch (error) {
			return res.status(500).json({status: 500, message: error.message});
		}
	}
}
module.exports = DoctorController;
