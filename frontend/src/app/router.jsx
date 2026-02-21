import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/login";
import Register from "../features/auth/pages/register";
import Dashboard from "../features/dashboard/pages/dashboard";
import ProtectedRoute from "../shared/components/ProtectedRoute";
import AppLayout from "../shared/layouts/AppLayout";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
