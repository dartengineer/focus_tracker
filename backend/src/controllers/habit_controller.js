const Habit = require("../models/habit_model");

exports.createHabit = async (req, res) => {
  try {
    const { title, frequency } = req.body;

    const habit = await Habit.create({
      title,
      frequency,
      user: req.user._id,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date();
    const lastCompleted = habit.lastCompleted;

    if (lastCompleted) {
      const diffTime = today - lastCompleted;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        habit.streakCount += 1;
      } else if (diffDays > 1) {
        habit.streakCount = 1;
      }
    } else {
      habit.streakCount = 1;
    }

    habit.lastCompleted = today;

    await habit.save();

    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
