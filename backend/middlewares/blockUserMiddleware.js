const User = require("../models/userModels");

const blockUserMiddleware = async (req, res, next) => {
	try {
		const {email} = req.body;
		const user = await User.findOne({email});
		if (user.isBlocked) {
			return res.status(401).json({success: false, message: "You are blocked"});
		}
		next();
	} catch (error) {
		console.log(error);
		res.json({
			error,
			success: false,
			message: "Something went wrong in blockUserMiddleware",
		});
	}
};

module.exports = blockUserMiddleware;
