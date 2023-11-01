const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then((connection) => {
			console.log(`Databse connected successfully at`.bgCyan.black);
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = connectDb;
