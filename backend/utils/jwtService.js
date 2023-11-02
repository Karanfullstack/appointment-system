const jwt = require("jsonwebtoken");

const generateToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
};

const verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return {error: err.message};
		}
		return decoded;
	});
};

module.exports = {generateToken, verifyToken};
