const Appointment = require("../../models/appointmentModel");
const User = require("../../models/userModels");
const Doctor = require("../../models/doctorModels");
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
				type: `Appointment Book For Date: ${moment
					.utc(newAppointment.date)
					.format("DD-MM-YYYY")} Time: ${moment
					.utc(newAppointment.time)
					.format("HH:mm")}`,
				message: `"You have booked an appointment with DR. ${newAppointment.doctorInfo.firstName.toUpperCase()} ",`,
			});

			const doctorNotification = doctor.notification;
			doctorNotification.push({
				type: `Appointment Book For Date: ${moment(newAppointment.date).format(
					"DD-MM-YYYY"
				)} Time: ${moment(newAppointment.time).format("HH:mm")}`,
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

	// getting all appointments of a doctor
	static async getDoctorAppointments(userId) {
		try {
			const doctor = await Doctor.findOne({userId});
			if (!doctor) throw new Error("Doctor not found");
			const appointments = await Appointment.find({doctorId: doctor});
			return appointments;
		} catch (error) {
			throw error;
		}
	}

	// getting approved appointments
	static async approveAppointments(appointmentId, doctorId) {
		try {
			const doctor = await User.findOne({_id: doctorId, isDoctor: true});
			if (!doctor) throw new Error("Doctor not found");
			const appointment = await Appointment.findOneAndUpdate(
				{_id: appointmentId},
				{status: "approved"},
				{new: true}
			);

			const user = await User.findOne({_id: appointment.userId});
			const notification = user.notification;

			notification.push({
				type: `Appointment Approved For Date: ${moment
					.utc(appointment.date)
					.format("DD-MM-YYYY")} Time: ${moment
					.utc(appointment.time)
					.format("HH:mm")}`,
				message: `"Your appointment with DR. ${appointment.doctorInfo.firstName.toUpperCase()} has been approved",`,
			});
			await User.findOneAndUpdate({_id: user._id}, {notification}, {new: true});
			return appointment;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = AppointmentService;
