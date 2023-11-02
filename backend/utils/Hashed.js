const bcrypt = require("bcryptjs");

const Hashed = async (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

const VeryfyPassword = async (password, hashedPassword) => {
	const isMatch = await bcrypt.compare(password, hashedPassword);
	return isMatch;
};

module.exports = {Hashed, VeryfyPassword};
