const userService = require("../services/userService");

class AuthController {
	// User Registration
	static async registerUser(req, res) {
		try {
			const userData = req.body;
			const user = await userService.registerUser(userData);

			// to prevent password from being sent to the frontend
			const {password, ...result} = user._doc;
			res.status(201).json({success: true, result, message: "User Registered"});
		} catch (error) {
			res.status(500).json({success: false, message: error.message});
		}
	}

	// User Login
	static async loginUser(req, res) {
		try {
			const userData = req.body;
			const {user, token} = await userService.loginUser(userData);
			const {password, ...result} = user._doc;
			res.status(200).json({
				success: true,
				message: "Login Successfully",
				result,
				token: `Bearer ${token}`,
			});
		} catch (error) {
			console.log(error.message);
			res.status(500).json({success: false, message: error.message});
		}
	}

	// User Authentication Controller
	static async AuthenticateUser(req, res) {
		try {
			const id = req.user.id;
			const user = await userService.authenticateUser(id);
			console.log(req.user);
			const {password, ...result} = user._doc;

			res.status(200).json({success: true, data: {result}});
		} catch (error) {
			console.log(error);
			res.status(500).json({success: false, message: error.message});
		}
	}

	// Updating User Profile Controller
	static async updateUserProfile(req, res) {
		try {
			const userId = req.user.id;
			const data = req.body;
			const user = await userService.updateUserProfile(data, userId);
			res.status(201).json({
				message: "Update Success",
				user,
			});
		} catch (error) {
			res.status(500).json({
				message: "Something went wrong in update user",
				error,
			});
		}
	}
}

module.exports = AuthController;
