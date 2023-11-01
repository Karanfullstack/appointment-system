const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const app = express();

// Dotenv config
dotenv.config();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// PORT
const PORT = process.env.PORT || 8080;

// Server listening
app.listen(PORT, () => {
	console.log(
		`Server Running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
			.bgRed.black
	);
});
