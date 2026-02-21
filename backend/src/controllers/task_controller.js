const Task = require("../models/task_model");

const asyncHandler = require("../middlewares/async_middleware");

exports.createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    dueDate,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

exports.getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(tasks);
});

exports.updateTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
