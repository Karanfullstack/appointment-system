const userService = require("../services/userService");

class AuthController {
	// User Registration
	static async registerUser(req, res) {
		try {
			const userData = req.body;
			const user = await userService.registerUser(userData);
			res.status(201).json({success: true, user});
		} catch (error) {
			res.status(500).json({success: false, message: error.message});
		}
	}

	// User Login
	static async loginUser(req, res) {
		try {
			const userData = req.body;

			const {user, token} = await userService.loginUser(userData);

			user.password = undefined;

			res.status(200).json({
				success: true,
				message: "Login Successfully",
				user,
				token,
			});
		} catch (error) {
			console.log(error.message);
			res.status(500).json({success: false, message: error.message});
		}
	}
}

module.exports = AuthController;
