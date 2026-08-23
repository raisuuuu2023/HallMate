import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const studentLinks = [
  { path: "/student", label: "Dashboard" },
  { path: "/student/complaints", label: "My Complaints" },
  { path: "/student/rooms", label: "Room Info" },
  { path: "/student/dining", label: "Dining Menu" },
  { path: "/student/visitors", label: "Visitors" },
  { path: "/student/events", label: "Events" },
  { path: "/student/notices", label: "Notices" },
  { path: "/student/laundry", label: "Laundry" },
  { path: "/student/fees", label: "Hall Fees" },
];

export default function StudentLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar links={studentLinks} />
      <main className="ml-56 pt-20 p-6">
        <Outlet />
      </main>
    </div>
  );
}