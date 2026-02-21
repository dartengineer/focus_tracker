import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";
import { Card } from "../../../shared/components/UIComponents";

export const HabitTrends = ({ habits }) => {
  // Generate mock data for the last 7 days
  const generateChartData = () => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        streaks: habits.reduce((sum, h) => sum + Math.max(0, h.streakCount - Math.floor(Math.random() * 2)), 0),
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const totalStreaks = habits.reduce((sum, h) => sum + h.streakCount, 0);
  const avgStreak = habits.length > 0 ? Math.round(totalStreaks / habits.length) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6"
    >
      <Card className="lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Streak Trends
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#333",
                border: "1px solid #555",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="streaks" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Habit Stats
        </h3>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="space-y-4"
        >
          <div className="text-center p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-300">
              {habits.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Active Habits
            </div>
          </div>
          <div className="text-center p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-300">
              {totalStreaks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Streak
            </div>
          </div>
          <div className="text-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">
              {avgStreak}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Streak
            </div>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};
