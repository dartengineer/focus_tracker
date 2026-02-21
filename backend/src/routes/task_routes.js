const express = require('express');
const router = express.Router();
const protect = require("../middlewares/auth_middleware");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task_controller");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
