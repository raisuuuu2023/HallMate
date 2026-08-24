import { NavLink } from "react-router-dom";

// menu items differ per role — passed in as a prop instead of
// hardcoding three separate sidebars
export default function Sidebar({ links }) {
  return (
    <aside className="w-56 bg-gray-900 text-white h-screen fixed left-0 top-0 pt-16">
      <nav className="flex flex-col gap-1 p-3">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}