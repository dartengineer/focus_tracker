const Task = require("../models/task_model");
const Habit = require("../models/habit_model");

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Task Stats
    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
      user: userId,
      status: "completed",
    });
    const pendingTasks = totalTasks - completedTasks;

    // Habit Stats
    const totalHabits = await Habit.countDocuments({ user: userId });

    const highestStreakHabit = await Habit.findOne({ user: userId })
      .sort({ streakCount: -1 })
      .limit(1);

    const highestStreak = highestStreakHabit
      ? highestStreakHabit.streakCount
      : 0;

    // Simple productivity score logic
    let productivityScore = 0;

    if (totalTasks > 0) {
      productivityScore =
        (completedTasks / totalTasks) * 50 + highestStreak * 5;
    }

    res.json({
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        pending: pendingTasks,
      },
      habits: {
        total: totalHabits,
        highestStreak,
      },
      productivityScore: Math.round(productivityScore),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
