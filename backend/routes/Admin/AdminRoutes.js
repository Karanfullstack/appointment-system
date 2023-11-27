const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/Admin/AdminController");
const AuthMiddleware = require("../../middlewares/authMiddleware");

// Get All Users List Route | GET | http://localhost:5000/api/admin/users
router.get("/users", AuthMiddleware, AdminController.getAllUsers);

// Get All Doctors List Route | GET | http://localhost:5000/api/admin/doctors
router.get("/doctors", AuthMiddleware, AdminController.getAllDoctors);

module.exports = router;
