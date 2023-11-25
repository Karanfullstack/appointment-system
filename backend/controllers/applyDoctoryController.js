const DoctorService = require("../services/appyDoctorService");

class ApplyDoctorController {
	static async applyDoctor(req, res) {
		try {
			const userId = req.user.id;
			const doctor = await DoctorService.applyDoctor({...req.body, userId});
			res
				.status(201)
				.json({message: "Apply Doctor Request Sent Successfully", doctor});
		} catch (error) {
			console.log(error);
			res.status(500).json({error: error.message});
		}
	}
}

module.exports = ApplyDoctorController;
