import { motion } from "framer-motion";
import { Button } from "../../../shared/components/UIComponents";
import { notifySuccess, notifyError } from "../../../shared/utils/notifications";

const TaskItem = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.status === "completed";
  const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;

  const handleToggle = async () => {
    try {
      await onToggle(task);
      notifySuccess(
        isCompleted ? "Task marked as pending" : "Task completed! 🎉"
      );
    } catch (error) {
      notifyError("Failed to update task");
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task._id);
      notifySuccess("Task deleted");
    } catch (error) {
      notifyError("Failed to delete task");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border-l-4 transition-all ${
        isCompleted
          ? "bg-gray-100 dark:bg-gray-700 border-l-green-500"
          : "bg-white dark:bg-gray-800 border-l-blue-500 shadow-md hover:shadow-lg"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p
            className={`font-medium ${
              isCompleted
                ? "line-through text-gray-500 dark:text-gray-400"
                : "text-gray-800 dark:text-white"
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {task.description}
            </p>
          )}
          {dueDate && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Due: {dueDate}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggle}
            className={`p-2 rounded-lg transition-colors ${
              isCompleted
                ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
            }`}
            title={isCompleted ? "Mark as pending" : "Mark as complete"}
          >
            {isCompleted ? "↩️" : "✓"}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 transition-colors"
            title="Delete task"
          >
            🗑️
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
