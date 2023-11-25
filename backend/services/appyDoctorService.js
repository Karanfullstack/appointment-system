const User = require("../models/userModels");
const Doctor = require("../models/doctorModels");

class DoctorService {
	static async applyDoctor(data) {
		try {
			const doctor = new Doctor(data);
			await doctor.save();

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
			return doctor;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = DoctorService;
