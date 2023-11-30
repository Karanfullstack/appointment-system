const Appointment = require("../../models/appointmentModel");
const User = require("../../models/userModels");
const Doctor = require("../../models/doctorModels");
class AppointmentService {
	static async createAppointment(appointment) {
		console.log(appointment);
		try {
			const newAppointment = new Appointment({
				userId: appointment.userId,
				doctorId: appointment.doctorId,
				userInfo: appointment.userInfo,
				doctorInfo: appointment.doctorInfo,
				date: appointment.date,
				time: appointment.time,
			});

			const user = await User.findOne({_id: newAppointment.userId});
			const doctor = await User.findOne({
				_id: newAppointment.doctorInfo.userId,
			});

			if (!user || !doctor) throw new Error("User or Doctor not found");
			const notification = user.notification;
			notification.push({
				type: `Appointment Book at Date: ${
					newAppointment.date
				} Time: ${newAppointment.time.toString()}`,
				message: `"You have booked an appointment with DR. ${newAppointment.doctorInfo.firstName.toUpperCase()} ",`,
			});

			const doctorNotification = doctor.notification;
			doctorNotification.push({
				type: `Appointment Book at Date: ${
					newAppointment.date
				} Time: ${newAppointment.time.toString()}`,
				message: `"You have a new appointment booked by ${newAppointment.userInfo.name.toUpperCase()} ",`,
			});

			await newAppointment.save();
			await user.save();
			await doctor.save();
			return newAppointment;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = AppointmentService;
