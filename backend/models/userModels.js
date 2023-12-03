const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isDoctor: {
		type: Boolean,
		default: false,
	},
	phone: {
		type: String,
		required: true,
	},
	notification: {
		type: Array,
		default: [],
	},
	seennotification: {
		type: Array,
		default: [],
	},
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
