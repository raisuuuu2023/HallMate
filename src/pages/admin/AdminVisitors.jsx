import { useState } from "react";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
const initialVisitors = [
  {
    id: 1,
    hostName: "Rafiq Islam",
    visitorName: "Karim Rahman",
    visitorContact: "01711223344",
    meetingPoint: "Common Room",
    reason: "Family visit",
    visitDate: "2026-08-20",
    visitTime: "16:00",
    status: "approved",
  },
  {
    id: 2,
    hostName: "Test User",
    visitorName: "Fahim Ahmed",
    visitorContact: "01899887766",
    meetingPoint: "Reception",
    reason: "Family Visit",
    visitDate: "2026-08-27",
    visitTime: "18:30",
    status: "pending",
  },
];

const FILTERS = ["all", "pending", "approved", "rejected"];

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [filter, setFilter] = useState("all");

  const updateStatus = (id, status) => {
    setVisitors(visitors.map((v) => (v.id === id ? { ...v, status } : v)));
  };

  const filtered = filter === "all" ? visitors : visitors.filter((v) => v.status === filter);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Visitor Management</h1>

      <div className="flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm capitalize ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState message="No visitor requests found." />
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Visiting</th>
                <th className="px-4 py-2">Visitor</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Meeting Point</th>
                <th className="px-4 py-2">Reason</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-t">
                  <td className="px-4 py-2">{v.hostName}</td>
                  <td className="px-4 py-2">{v.visitorName}</td>
                  <td className="px-4 py-2">{v.visitorContact}</td>
                  <td className="px-4 py-2">{v.meetingPoint}</td>
                  <td className="px-4 py-2">{v.reason}</td>
                  <td className="px-4 py-2">{v.visitDate}</td>
                  <td className="px-4 py-2">{v.visitTime}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-4 py-2">
                    {v.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(v.id, "approved")}
                          className="text-xs bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(v.id, "rejected")}
                          className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}