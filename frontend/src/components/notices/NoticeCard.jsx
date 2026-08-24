import StatusBadge from "../common/StatusBadge";

const CATEGORY_COLORS = {
  general: "bg-blue-100 text-blue-700",
  maintenance: "bg-orange-100 text-orange-700",
  emergency: "bg-red-100 text-red-700",
  event: "bg-purple-100 text-purple-700",
  other: "bg-gray-100 text-gray-700",
};

export default function NoticeCard({ notice, onEdit, onDelete, isAdmin }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{notice.title}</h3>
        <span
          className={`text-xs px-2 py-1 rounded-full capitalize ${
            CATEGORY_COLORS[notice.category] || CATEGORY_COLORS.other
          }`}
        >
          {notice.category}
        </span>
      </div>

      <p className="text-gray-600 text-sm mt-2">{notice.content}</p>

      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
        <span>
          By {notice.createdBy} • {new Date(notice.createdAt).toLocaleDateString()}
        </span>

        {isAdmin && (
          <div className="flex gap-2">
            <button onClick={() => onEdit(notice)} className="text-blue-600 hover:underline">
              Edit
            </button>
            <button onClick={() => onDelete(notice.id)} className="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}