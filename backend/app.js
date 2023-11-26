const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/databaseConfig");
const cors = require("cors");
const app = express();

// Dotenv config
dotenv.config();

// Databse Connection
connectDb();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Imports User Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

// Imports Doctor Routes
const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctor", doctorRoutes);

// Imports Notification Routes
const notificationRoutes = require("./routes/notificationRoutes");
app.use("/api/notification", notificationRoutes);

// Server listening
// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(
		`Server Running in ${process.env.DEV_MODE} mode on port ${process.env.PORT}`
			.bgRed.black
	);
});
