const {verifyToken} = require("../utils/jwtService");

const authMiddleware = async (req, res, next) => {
	try {
		const token = req.headers["authorization"].split(" ")[1];
		const decode = verifyToken(token);
		if (decode.error) {
			return res.status(401).json({error: decode.error});
		} else {
			req.user = decode;
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(401).json({error: "Not authorized, token failed"});
	}
};

module.exports = authMiddleware;
