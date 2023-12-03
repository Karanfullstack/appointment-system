const Appointment = require("../../models/appointmentModel");
const User = require("../../models/userModels");
const moment = require("moment");

class AppointmentService {
	static async createAppointment(appointment) {
		try {
			const newAppointment = new Appointment({
				userId: appointment.userId,
				doctorId: appointment.doctorId,
				userInfo: appointment.userInfo,
				doctorInfo: appointment.doctorInfo,
				date: moment.utc(appointment.date, "DD-MM-YYYY").toISOString(),
				time: moment.utc(appointment.time, "HH:mm", "UTC").toISOString(),
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

	// Checking Appointment Availbility
	static async checkAvailbility(time, date) {
		try {
			// converting time and date to ISOString
			const isoTime = moment.utc(time, "HH:mm").format();
			const isoDate = moment.utc(date, "DD-MM-YYYY").toISOString();

			// checking time before and after 1 hour
			const oneHourAfter = moment(isoTime).add(1, "hours").toISOString();
			const oneHourBefore = moment(isoTime).subtract(1, "hours").toISOString();

			// checking if appointment is already booked on the basis of date and time
			const appointment = await Appointment.findOne({
				date: isoDate,
				time: {
					$gte: oneHourBefore,
					$lt: oneHourAfter,
				},
			});

			const isAvailable = !appointment;
			console.log(isAvailable);
			return {isAvailable, appointment};
		} catch (error) {
			throw error;
		}
	}
	// getting all appointments of a user
	static async getAppointments(userId) {
		try {
			const appointments = await Appointment.find({userId});
			return appointments;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = AppointmentService;
