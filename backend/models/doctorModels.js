const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
	userId: {
		type: String,
	},
	firstName: {
		type: String,
		required: [true, "First name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"],
	},
	phone: {
		type: String,
		required: [true, "Phone number is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
	},
	website: {
		type: String,
	},
	address: {
		type: String,
		required: [true, "Address is required"],
	},
	specialization: {
		type: String,
		required: [true, "Specialization is required"],
	},
	experience: {
		type: String,
		required: [true, "Experience is required"],
	},
	feesPerSession: {
		type: Number,
		required: [true, "Fees per session is required"],
	},
	timings: {
		type: Object,
		required: [true, "Timings is required"],
	},
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;
