const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		doctorId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Doctor",
		},
		userInfo: {
			type: Object,
			required: true,
		},
		doctorInfo: {
			type: Object,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: "pending",
		},

		time: {
			type: String,
			required: true,
		},
	},
	{timestamps: true}
);

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
