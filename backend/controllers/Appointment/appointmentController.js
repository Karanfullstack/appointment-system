const AppointmentService = require("../../services/Appointment/appointmentService");

class AppointmentController {
	static async createAppointment(req, res) {
		try {
			const appointment = await AppointmentService.createAppointment(req.body);
			return res.status(200).json({
				status: 200,
				data: appointment,
				message: "Successfully created appointment",
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({status: 500, message: error});
		}
	}
}

module.exports = AppointmentController;
