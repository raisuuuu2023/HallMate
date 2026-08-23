import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "error" ? "bg-red-600" : "bg-green-600";

  return (
    <div
      className={`fixed bottom-5 right-5 ${bgColor} text-white px-4 py-3 rounded shadow-lg z-50`}
    >
      {message}
    </div>
  );
}