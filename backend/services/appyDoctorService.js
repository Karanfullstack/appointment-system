const User = require("../models/userModels");
const Doctor = require("../models/doctorModels");

class DoctorService {
	static async applyDoctor(data) {
		try {
			// checking if user applied for doctor
			const doctor = await Doctor.findOne({userId: data.userId});

			if (doctor) throw new Error("You already applied for doctor.");

			const newDoctor = new Doctor(data);
			await newDoctor.save();

			// getting admin user
			const adminUser = await User.findOne({isAdmin: true});
			const notification = adminUser.notification;

			//  sending notification to admin
			notification.push({
				type: "Apply Doctor Request",
				message: `${doctor.firstName} ${doctor.lastName} has applied for doctor.`,
				data: {
					doctorId: doctor._id,
					name: `${doctor.firstName} ${doctor.lastName}`,
					onClickPath: "/admin/doctor",
				},
			});

			// updating admin user
			await User.findOneAndUpdate(adminUser._id, {notification});

			// returning doctor
			return newDoctor;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = DoctorService;
