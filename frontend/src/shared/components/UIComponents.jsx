import { motion } from "framer-motion";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100",
    danger: "bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600",
    success:
      "bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      className={`${sizes[size]} ${variants[variant]} rounded-lg font-semibold transition-colors ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const Card = ({ children, className = "" }) => (
  <motion.div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${className}`}
    {...props}
  />
);

export const Select = ({ children, className = "", ...props }) => (
  <select
    className={`px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${className}`}
    {...props}
  >
    {children}
  </select>
);
