const User = require("../models/userModels");
const {Hashed, VeryfyPassword} = require("../utils/Hashed");

const registerController = async (req, res) => {
	try {
		const {name, email, password} = req.body;

		// Check if user exists
		const existingUser = await User.findOne({email});
		if (existingUser) {
			return res
				.status(201)
				.json({success: false, message: "User already exists"});
		}

		// Hash password
		const hashedPassword = await Hashed(password);

		// Create new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		await newUser.save();
		res
			.status(201)
			.json({success: true, message: "User created successfully  "});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({success: false, message: `Register Error: ${error.message}`});
	}
};

const loginController = async (req, res) => {};

module.exports = {loginController, registerController};
