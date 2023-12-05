const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/Admin/AdminController");
const AuthMiddleware = require("../../middlewares/authMiddleware");

// Get All Users List Route | GET | http://localhost:5173/api/admin/users
router.get("/users", AuthMiddleware, AdminController.getAllUsers);

// Get All Doctors List Route | GET | http://localhost:5173/api/admin/doctors
router.get("/doctors", AuthMiddleware, AdminController.getAllDoctors);

// Approved Doctor Status Route | PUT | http://localhost:5173/api/admin/approved-doctor
router.put(
	"/approved-doctor",
	AuthMiddleware,
	AdminController.approveDoctorController
);

// Block User Route | PUT | http://localhost:5173/api/admin/block-user
router.put("/block-user", AuthMiddleware, AdminController.blockUser);
module.exports = router;
