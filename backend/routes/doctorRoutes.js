const ApplyDoctorController = require("../controllers/applyDoctoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");

const router = express.Router();

// Apply Doctor Route || POST

router.post("/apply-doctor", authMiddleware, ApplyDoctorController.applyDoctor);

module.exports = router;
