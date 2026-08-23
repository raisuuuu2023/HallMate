import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const adminLinks = [
  { path: "/admin", label: "Dashboard" },
  { path: "/admin/students", label: "Students" },
  { path: "/admin/rooms", label: "Rooms" },
  { path: "/admin/complaints", label: "Complaints" },
  { path: "/admin/workers", label: "Workers" },
  { path: "/admin/dining", label: "Dining" },
  { path: "/admin/visitors", label: "Visitors" },
  { path: "/admin/emergencies", label: "Emergencies" },
  { path: "/admin/events", label: "Events" },
  { path: "/admin/notices", label: "Notices" },
  { path: "/admin/fees", label: "Hall Fees" },
];

export default function AdminLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar links={adminLinks} />
      <main className="ml-56 pt-20 p-6">
        <Outlet />
      </main>
    </div>
  );
}