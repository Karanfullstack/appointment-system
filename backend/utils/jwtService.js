const jwt = require("jsonwebtoken");

const generateToken = (user) => {
	return jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

const verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			throw new Error(err.message);
		}
		return decoded;
	});
};

module.exports = {generateToken, verifyToken};
