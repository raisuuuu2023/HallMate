const STATUS_STYLES = {
  // complaint workflow
  submitted: "bg-gray-100 text-gray-700",
  reviewed: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  "in progress": "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  closed: "bg-gray-300 text-gray-800",

  // visitor / fee statuses
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  paid: "bg-green-100 text-green-700",
  due: "bg-orange-100 text-orange-700",
  fine: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  const key = status?.toLowerCase();
  const style = STATUS_STYLES[key] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${style}`}>
      {status}
    </span>
  );
}