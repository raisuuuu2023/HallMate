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

import StudentEvents from "../pages/student/StudentEvents";
import AdminEvents from "../pages/admin/AdminEvents";

import NoticesPage from "../pages/student/NoticesPage";
import ManageNotices from "../pages/admin/ManageNotices";

import DiningMenuPage from "../pages/student/DiningMenuPage";
import ManageDining from "../pages/admin/ManageDining";


export default function AppRoutes() {
  return (
    <Routes>
      {/* public routes */}
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
        <Route path="events" element={<StudentEvents />} />

        {/* Part 5 adds: complaints, Part 8 adds: dining/notices, etc. */}
        <Route path="notices" element={<NoticesPage />} />
        <Route path="dining" element={<DiningMenuPage />} />
       
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
        <Route path="events" element={<AdminEvents />} />
        <Route path="notices" element={<ManageNotices />} />
        <Route path="dining" element={<ManageDining />} />
        
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