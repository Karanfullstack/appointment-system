const bcrypt = require("bcryptjs");

const Hashed = async (password) => {
	const salt = bcrypt.genSaltSync(10);
	const hash = await bcrypt.hash(password, salt);
	return hash;
};

const VeryfyPassword = async (password, hashedPassword) => {
	const match = await bcrypt.compare(password, hashedPassword);
	return match;
};

module.exports = {Hashed, VeryfyPassword};
