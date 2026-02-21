import { motion } from "framer-motion";
import { useTheme } from "../../features/theme/ThemeContext";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? "🌙" : "☀️"}
    </motion.button>
  );
};
