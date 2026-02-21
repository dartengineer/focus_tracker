const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth_middleware");

const {
  createHabit,
  getHabits,
  completeHabit,
  deleteHabit,
} = require("../controllers/habit_controller");

router.post("/", protect, createHabit);
router.get("/", protect, getHabits);
router.put("/:id/complete", protect, completeHabit);
router.delete("/:id", protect, deleteHabit);

module.exports = router;
