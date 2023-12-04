const express = require("express");
const AppointmentController = require("../../controllers/Appointment/appointmentController");
const AuthMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

// Create Appointment Route | Method: POST | "/api/appointment/create"
router.post("/create", AuthMiddleware, AppointmentController.createAppointment);

// Check Appointment Availbility Route | Method: POST | "/api/appointment/check"
router.post("/check", AuthMiddleware, AppointmentController.checkAvailbility);

// Getting All Appointments User Route | Method: GET | "/api/user/appointment/get"
router.get("/user/get", AuthMiddleware, AppointmentController.getAppointments);

// Getting All Appointments Doctor Route | Method: GET | "/api/doctor/appointment/get"
router.get(
	"/doctor/get",
	AuthMiddleware,
	AppointmentController.getDoctorAppoinments
);

// Getting Appointments Approved Route | Method: PUT | "/api/appointment/approved"
router.put(
	"/approved",
	AuthMiddleware,
	AppointmentController.approveAppointments
);
module.exports = router;
