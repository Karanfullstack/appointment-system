const AppointmentService = require("../../services/Appointment/appointmentService");

class AppointmentController {
	static async createAppointment(req, res) {
		try {
			const userId = req.body.id;
			const appointment = await AppointmentService.createAppointment(
				req.body,
				userId
			);
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

	// Checking Appointment Availbility
	static async checkAvailbility(req, res) {
		try {
			const {time, date} = req.body;
			const isAvailable = await AppointmentService.checkAvailbility(time, date);
			return res.status(200).json({
				data: isAvailable,
				message: "Successfully checked appointment",
			});
		} catch (error) {
			console.log(error);
		}
	}

	// getting all appointments for user
	static async getAppointments(req, res) {
		try {
			const userId = req.user.id;
			const appointments = await AppointmentService.getAppointments(userId);
			if (!appointments) {
				return res
					.status(404)
					.json({status: 404, message: "No appointments found"});
			}
			return res.status(200).json({
				count: appointments.length,
				status: 200,
				data: appointments,
				message: "Successfully fetched appointments",
			});
		} catch (error) {
			return res.status(500).json({status: 500, message: error});
		}
	}

	// getting all appointments for doctor
	static async getDoctorAppoinments(req, res) {
		try {
			const userId = req.user.id;
			const doctor = await AppointmentService.getDoctorAppointments(userId);
			if (!doctor) {
				return res
					.status(404)
					.json({status: 404, message: "No appointments found"});
			}
			return res.status(200).json({
				status: 200,
				data: doctor,
				message: "Successfully fetched appointments",
			});
		} catch (error) {
			console.log(error);
		}
	}
	// getting  approved appointments
	static async approveAppointments(req, res) {
		try {
			const {appointmentId} = req.body;
			const doctorId = req.user.id;
			const appointment = await AppointmentService.approveAppointments(
				appointmentId,
				doctorId
			);
			if (appointment.status === "Approved") {
				return res
					.status(200)
					.json({message: "Appointment is already approved"});
			}
			return res.status(200).json({
				status: 200,
				data: appointment,
				message: "Successfully approved appointments",
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({status: 500, message: error});
		}
	}
}

module.exports = AppointmentController;
