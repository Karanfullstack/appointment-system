const User = require("../models/userModels");
const {Hashed, VeryfyPassword} = require("../utils/Hashed");
const {generateToken} = require("../utils/jwtService");

class UserService {
	// User Registration
	static async registerUser(userData) {
		try {
			const user = await User.findOne({email: userData.email});

			if (user) {
				throw new Error("User already exists");
			}
			// Hash password
			const hashedPassword = await Hashed(userData.password);
			// Create new user
			const newUser = new User({...userData, password: hashedPassword});

			// Save user
			const savedUser = await newUser.save();
			return savedUser;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}

	// User Login
	static async loginUser(userData) {
		try {
			// check if user exists
			const user = await User.findOne({email: userData.email});

			if (!user) throw new Error("User does not exist");

			// check if password is correct
			const isMatch = await VeryfyPassword(userData.password, user.password);
			
			if (!isMatch) throw new Error("Invalid Credentials");

			const {password, ...result} = user._doc;

			// generate token
			const token = generateToken(result);

			return {user, token};
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	}

	// User Authentication Service
	static async authenticateUser(userId) {
		try {
			const user = await User.findById(userId);
			if (!user) throw new Error("User does not exist");
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}

	
}

module.exports = UserService;
