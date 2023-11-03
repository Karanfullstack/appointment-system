const {verifyToken} = require("../utils/jwtService");

const authMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(400).json({success: false, message: "Token Not Found"});
		}
		const decoded = verifyToken(token);
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({success: false, message: "Invalid Token"});
	}
};
module.exports = authMiddleware;
