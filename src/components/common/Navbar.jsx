import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b flex items-center justify-between px-4 z-10">
      <span className="font-bold text-blue-600">SmartHall</span>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name} <span className="text-gray-400">({user?.role})</span>
        </span>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}