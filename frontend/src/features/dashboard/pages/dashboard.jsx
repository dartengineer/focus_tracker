import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getDashboardStats } from "../dashboard_service";
import { useAuth } from "../../auth/auth_context";
import { useTheme } from "../../theme/ThemeContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../tasks/task_service";
import {
  getHabits,
  createHabit,
  completeHabit,
  deleteHabit,
} from "../../habits/habit_service";
import TaskForm from "../../tasks/components/TaskForm";
import TaskItem from "../../tasks/components/TaskItem";
import TaskChart from "../components/TaskChart";
import HabitItem from "../../habits/components/HabitItem";
import HabitForm from "../../habits/components/HabitForm";
import { HabitTrends } from "../../habits/components/HabitTrends";
import { ThemeToggle } from "../../../shared/components/ThemeToggle";
import { Button, Card } from "../../../shared/components/UIComponents";
import { CardSkeleton, TaskSkeleton } from "../../../shared/components/Skeleton";
import { notifyError } from "../../../shared/utils/notifications";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);

  const handleCreateTask = async (data) => {
    try {
      const newTask = await createTask(data);
      setTasks([newTask.data || newTask, ...tasks]);
    } catch (error) {
      notifyError("Failed to create task");
    }
  };

  const handleCreateHabit = async (data) => {
    try {
      const newHabit = await createHabit(data);
      setHabits([newHabit.data || newHabit, ...habits]);
    } catch (error) {
      notifyError("Failed to create habit");
    }
  };

  const handleToggleHabit = async (habit) => {
    try {
      const updated = await completeHabit(habit._id);
      setHabits(
        habits.map((h) => (h._id === habit._id ? updated.data || updated : h))
      );
    } catch (error) {
      notifyError("Failed to complete habit");
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
      setHabits(habits.filter((h) => h._id !== id));
    } catch (error) {
      notifyError("Failed to delete habit");
    }
  };

  const handleToggleTask = async (task) => {
    try {
      const updated = await updateTask(task._id, {
        status: task.status === "completed" ? "pending" : "completed",
      });
      setTasks(
        tasks.map((t) => (t._id === task._id ? updated.data || updated : t))
      );
    } catch (error) {
      notifyError("Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      notifyError("Failed to delete task");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, tasksData, habitsData] = await Promise.all([
          getDashboardStats(),
          getTasks(),
          getHabits(),
        ]);
        setStats(statsData);
        setTasks(tasksData.data || tasksData);
        setHabits(habitsData.data || habitsData);
      } catch (error) {
        notifyError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="flex flex-col"
          >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              📊 Dashboard
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Welcome back, {user?.name}! 👋
            </p>
          </motion.div>
          <div className="flex gap-3 items-center">
            <ThemeToggle />
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : stats ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatCard
              icon="📝"
              label="Total Tasks"
              value={stats.tasks.total}
              color="bg-blue"
            />
            <StatCard
              icon="✅"
              label="Completed"
              value={stats.tasks.completed}
              color="bg-green"
            />
            <StatCard
              icon="⏳"
              label="Pending"
              value={stats.tasks.pending}
              color="bg-yellow"
            />
            <StatCard
              icon="🎯"
              label="Productivity"
              value={`${stats.productivityScore}%`}
              color="bg-purple"
            />
          </motion.div>
        ) : null}

        {/* Tasks Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-2">
              📋 Tasks
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
          </div>

          <TaskForm onCreate={handleCreateTask} />

          <div className="space-y-3">
            {loading ? (
              <TaskSkeleton />
            ) : tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <p className="text-gray-500 dark:text-gray-400">
                  No tasks yet. Create one to get started! 🚀
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Habits Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-2">
              🔥 Habits
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
          </div>

          {!loading && habits.length > 0 && (
            <HabitTrends habits={habits} />
          )}

          <HabitForm onCreate={handleCreateHabit} />

          <div className="space-y-3">
            {loading ? (
              <TaskSkeleton />
            ) : habits.length > 0 ? (
              habits.map((habit) => (
                <HabitItem
                  key={habit._id}
                  habit={habit}
                  onToggle={handleToggleHabit}
                  onDelete={handleDeleteHabit}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <p className="text-gray-500 dark:text-gray-400">
                  No habits yet. Build one today! 💪
                </p>
              </motion.div>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
          {label}
        </p>
        <p className="text-3xl font-bold text-gray-800 dark:text-white">
          {value}
        </p>
      </div>
      <span className="text-4xl">{icon}</span>
    </div>
  </motion.div>
);

export default Dashboard;
