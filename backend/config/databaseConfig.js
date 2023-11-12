const mongoose = require("mongoose");
const colors = require("colors");

const connectDb = () => {
	mongoose
		.connect(process.env.MONGO_URL)
		.then((connection) => {
			console.log(
				`Databse connected successfully`.bgCyan.black
			);
		})
		.catch((error) => {
			console.log(error).bgCyan;
		});
};

module.exports = connectDb;
