const User = require("../models/userModels");
const {Hashed, VeryfyPassword} = require("../utils/Hashed");
const {generateToken} = require("../utils/jwtService");

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

const loginController = async (req, res) => {
	try {
		const {email, password} = req.body;

		const user = await User.findOne({email});
		if (!user) {
			return res.status(400).json({success: false, message: "Email not found"});
		}

		// Verify password
		const matchPassword = await VeryfyPassword(password, user.password);
		if (!matchPassword) {
			return res
				.status(400)
				.json({success: false, message: "Invalid credentials"});
		}

		// Generate token
		const token = generateToken(user._id);

		res.status(200).json({success: true, message: "Login successfully", token});
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({success: false, message: `Error in Login CTRL ${error.message}}`});
	}
};

module.exports = {loginController, registerController};
