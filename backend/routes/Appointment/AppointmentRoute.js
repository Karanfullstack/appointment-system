const express = require("express");
const AppointmentController = require("../../controllers/Appointment/appointmentController");
const AuthMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();

// Create Appointment Route | Method: POST | "/api/appointment/create"
router.post("/create", AuthMiddleware, AppointmentController.createAppointment);

module.exports = router;
