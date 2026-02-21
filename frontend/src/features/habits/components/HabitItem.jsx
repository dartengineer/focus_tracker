import { motion } from "framer-motion";
import { notifySuccess, notifyError } from "../../../shared/utils/notifications";

const HabitItem = ({ habit, onToggle, onDelete }) => {
  const lastCompletedDate = habit.lastCompleted
    ? new Date(habit.lastCompleted).toLocaleDateString()
    : "Never";

  const isCompletedToday = habit.lastCompleted
    ? new Date(habit.lastCompleted).toDateString() === new Date().toDateString()
    : false;

  const handleToggle = async () => {
    try {
      await onToggle(habit);
      notifySuccess(`${habit.title} marked complete! Streak: ${habit.streakCount} 🔥`);
    } catch (error) {
      notifyError("Failed to complete habit");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(habit._id);
      notifySuccess("Habit deleted");
    } catch (error) {
      notifyError("Failed to delete habit");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 border-l-4 border-l-purple-500 shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-800 dark:text-white text-lg">
              {habit.title}
            </h4>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
              {habit.frequency === "daily" ? "🌅 Daily" : "📅 Weekly"}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 p-3 rounded-lg text-center"
            >
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
                🔥
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Streak
              </div>
              <div className="font-bold text-lg text-orange-700 dark:text-orange-200">
                {habit.streakCount}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 p-3 rounded-lg text-center"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
                📊
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Status
              </div>
              <div className="font-bold text-lg text-blue-700 dark:text-blue-200">
                {isCompletedToday ? "✅" : "⏳"}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-3 rounded-lg text-center"
            >
              <div className="text-2xl font-bold text-green-600 dark:text-green-300">
                📅
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Last
              </div>
              <div className="font-bold text-xs text-green-700 dark:text-green-200 truncate">
                {lastCompletedDate}
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            disabled={isCompletedToday}
            className={`p-2 rounded-lg transition-all ${
              isCompletedToday
                ? "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200"
                : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
            }`}
            title={isCompletedToday ? "Completed today!" : "Mark complete"}
          >
            {isCompletedToday ? "✓" : "+"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            title="Delete habit"
          >
            🗑️
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HabitItem;
