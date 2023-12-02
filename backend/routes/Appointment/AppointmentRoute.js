const express = require("express");
const AppointmentController = require("../../controllers/Appointment/appointmentController");
const AuthMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

// Create Appointment Route | Method: POST | "/api/appointment/create"
router.post("/create", AuthMiddleware, AppointmentController.createAppointment);

// Check Appointment Availbility Route | Method: POST | "/api/appointment/check"
router.post("/check", AuthMiddleware, AppointmentController.checkAvailbility);

module.exports = router;
