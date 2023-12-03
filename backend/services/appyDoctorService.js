const User = require("../models/userModels");
const Doctor = require("../models/doctorModels");

class DoctorService {
	static async applyDoctor(data, userId) {
		try {
			// checking if user applied for doctor
			const doctor = await Doctor.findOne({userId});
			console.log(doctor);
			if (doctor) throw new Error("You already applied for doctor.");

			const newDoctor = new Doctor(data);
			await newDoctor.save();

			// getting admin user
			const adminUser = await User.findOne({isAdmin: true});
			const notification = adminUser.notification;

			//  sending notification to admin
			notification.push({
				type: "Apply Doctor Request",
				message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for doctor.`,
				data: {
					doctorId: newDoctor._id,
					name: `${newDoctor.firstName} ${newDoctor.lastName}`,
					onClickPath: "/admin/doctor",
				},
			});

			// updating admin user
			await User.findOneAndUpdate(adminUser._id, {notification});

			// returning doctor
			return newDoctor;
		} catch (error) {
			throw error;
		}
	}
}

module.exports = DoctorService;
