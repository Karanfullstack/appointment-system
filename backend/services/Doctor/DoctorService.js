const Doctor = require("../../models/doctorModels");
const User = require("../../models/userModels");

class DoctorService {
	// Get current doctor
	static async getDoctor(userId) {
		try {
			const doctor = await Doctor.findOne({userId});
			return doctor;
		} catch (error) {
			throw error;
		}
	}

	// Update current doctor
	static async updateDoctor(userId, doctor) {
		try {
			const updateDoctor = {};

			if (doctor.firstName) updateDoctor.firstName = doctor.firstName;
			if (doctor.lastName) updateDoctor.lastName = doctor.lastName;
			if (doctor.phone) updateDoctor.phone = doctor.phone;
			if (doctor.address) updateDoctor.address = doctor.address;
			if (doctor.email) updateDoctor.email = doctor.email;
			if (doctor.experience) updateDoctor.experience = doctor.experience;
			if (doctor.website) updateDoctor.website = doctor.website;
			if (doctor.feesPerSession)
				updateDoctor.feesPerSession = doctor.feesPerSession;
			if (doctor.specialization)
				updateDoctor.specialization = doctor.specialization;
			if (doctor.timings) updateDoctor.timings = doctor.timings;
			console.log(updateDoctor);
			const newDoctor = await Doctor.findOneAndUpdate(
				{userId},
				{$set: updateDoctor},
				{new: true}
			);
			const admin = await User.findOne({isAdmin: true});
			const notification = admin.notification;
			notification.push({
				message: `${newDoctor.firstName} ${newDoctor.lastName} updated his profile`,
				createdAt: Date.now(),
				data: {
					doctorId: newDoctor._id,
					name: `${newDoctor.firstName} ${newDoctor.lastName}`,
				},
			});
			await User.findOneAndUpdate({isAdmin: true}, {notification});
			return newDoctor;
		} catch (error) {
			throw error;
		}
	}

	// Get Approved Doctor List
	static async getApprovedDoctor() {
		try {
			const doctor = await Doctor.find({status: "approved"});
			return doctor;
		} catch (error) {
			throw error;
		}
	}
}
module.exports = DoctorService;
