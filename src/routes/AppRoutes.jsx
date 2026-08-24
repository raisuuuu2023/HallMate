import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import RoleRoute from "./RoleRoute";

import StudentLayout from "../layouts/StudentLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProvostLayout from "../layouts/ProvostLayout";

import StudentDashboard from "../pages/student/StudentDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProvostDashboard from "../pages/provost/ProvostDashboard";

import StudentVisitors from "../pages/student/StudentVisitors";
import AdminVisitors from "../pages/admin/AdminVisitors";

export default function AppRoutes() {
  return (
    <Routes>
    
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* student routes — layout wraps every nested page */}
      <Route
        path="/student"
        element={
          <RoleRoute allowedRoles={["student"]}>
            <StudentLayout />
          </RoleRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="visitors" element={<StudentVisitors />} />
        {/* Part 5 adds: complaints, Part 8 adds: dining/notices/events, etc. */}
      </Route>

      {/* admin routes */}
      <Route
        path="/admin"
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="visitors" element={<AdminVisitors />} />
        {/* Part 6+ adds nested admin pages here */}
      </Route>

      {/* provost routes */}
      <Route
        path="/provost"
        element={
          <RoleRoute allowedRoles={["provost"]}>
            <ProvostLayout />
          </RoleRoute>
        }
      >
        <Route index element={<ProvostDashboard />} />
      </Route>

      {/* fallback */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<h1 className="text-center mt-20">404 - Page Not Found</h1>} />
    </Routes>
  );
}