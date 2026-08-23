import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const provostLinks = [
  { path: "/provost", label: "Dashboard" },
  { path: "/provost/analytics", label: "Analytics" },
  { path: "/provost/reports", label: "Reports" },
];

export default function ProvostLayout() {
  return (
    <div>
      <Navbar />
      <Sidebar links={provostLinks} />
      <main className="ml-56 pt-20 p-6">
        <Outlet />
      </main>
    </div>
  );
}