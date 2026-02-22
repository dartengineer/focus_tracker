import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../auth_service";
import { useAuth } from "../auth_context";
import { Button, Input, Card } from "../../../shared/components/UIComponents";
import { notifyError, notifySuccess } from "../../../shared/utils/notifications";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      notifyError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      notifyError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser(form);
      login(data);
      notifySuccess("Account created successfully! 🎉");
      navigate("/dashboard");
    } catch (err) {
      notifyError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Animated background shapes */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-2xl"
        animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl"
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md relative z-10"
      >
        {/* Logo Section */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold text-white dark:text-white mb-2">
            Join Focus Tracker
          </h1>
          <p className="text-white/80 dark:text-gray-300">
            Start your productivity journey today
          </p>
        </motion.div>

        {/* Register Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center"
            >
              Create Account 🎯
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  👤 Full Name
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={loading}
                  className="w-full"
                />
              </motion.div>

              {/* Email Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📧 Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={loading}
                  className="w-full"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  🔒 Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    disabled={loading}
                    className="w-full pr-10"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </motion.button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum 6 characters
                </p>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="my-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    or
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 grid grid-cols-3 gap-4 text-center"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="text-white/80 dark:text-gray-300 text-sm"
          >
            <div className="text-2xl mb-1">📊</div>
            <p>Track Progress</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="text-white/80 dark:text-gray-300 text-sm"
          >
            <div className="text-2xl mb-1">🔥</div>
            <p>Build Streaks</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="text-white/80 dark:text-gray-300 text-sm"
          >
            <div className="text-2xl mb-1">🎯</div>
            <p>Stay Focused</p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-white/60 dark:text-gray-400 text-xs">
            🔐 Your data is secure and private
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
