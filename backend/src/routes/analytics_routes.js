const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth_middleware");
const {
  getDashboardStats,
} = require("../controllers/analytics_controller");

router.get("/dashboard", protect, getDashboardStats);

module.exports = router;
