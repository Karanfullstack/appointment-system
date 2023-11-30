const ApplyDoctorController = require("../controllers/applyDoctoryController");
const DoctorController = require("../controllers/Doctor/DoctorController");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

// Apply Doctor Route || POST
router.post("/apply-doctor", authMiddleware, ApplyDoctorController.applyDoctor);

// Get Doctor Route || GET
router.get("/get-doctor", authMiddleware, DoctorController.getDoctorController);

// Update Doctor Route || PUT
router.put(
	"/update-doctor",
	authMiddleware,
	DoctorController.updateDoctorController
);

// Get Approved Doctor List Route || GET
router.get(
	"/get-approved-doctor-list",
	authMiddleware,
	DoctorController.getApprovedDoctorController
);

// Get Doctor By Id (Appointment Page) Route || GET
router.get(
	"/get-doctor/:id",
	authMiddleware,
	DoctorController.getDoctorByIdController
);
module.exports = router;
