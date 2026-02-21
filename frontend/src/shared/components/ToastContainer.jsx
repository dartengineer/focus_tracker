import { Toaster } from "sonner";
import { useTheme } from "../../features/theme/ThemeContext";

export const ToastContainer = () => {
  const { isDark } = useTheme();

  return (
    <Toaster
      theme={isDark ? "dark" : "light"}
      position="top-right"
      richColors
      expand
    />
  );
};
