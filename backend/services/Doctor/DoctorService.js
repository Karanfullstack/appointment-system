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
			return newDoctor;
		} catch (error) {
			throw error;
		}
	}
}
module.exports = DoctorService;
