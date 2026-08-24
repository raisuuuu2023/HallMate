import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
const initialVisitors = [
  {
    id: 1,
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
    visitorName: "Fahim Ahmed",
    visitorContact: "01899887766",
    meetingPoint: "Reception",
    reason: "Family Visit",
    visitDate: "2026-08-27",
    visitTime: "18:30",
    status: "pending",
  },
];

export default function StudentVisitors() {
  const { user } = useAuth();
  const [visitors, setVisitors] = useState(initialVisitors);
  const [form, setForm] = useState({
    visitorName: "",
    visitorContact: "",
    meetingPoint: "Common Room",
    reason: "",
    visitDate: "",
    visitTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.visitorName ||
      !form.visitorContact ||
      !form.meetingPoint ||
      !form.reason ||
      !form.visitDate ||
      !form.visitTime
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...form,
      hostName: user?.name,
      status: "pending",
    };

    // real backend: await createVisitorRequest(newRequest);
    setVisitors([newRequest, ...visitors]);
    setForm({
      visitorName: "",
      visitorContact: "",
      meetingPoint: "Common Room",
      reason: "",
      visitDate: "",
      visitTime: "",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Visitor Management</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-lg">
        <h2 className="text-lg font-semibold">New Visitor Request</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Visitor Name</label>
          <input
            name="visitorName"
            value={form.visitorName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Karim Rahman"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Visitor Contact</label>
          <input
            name="visitorContact"
            value={form.visitorContact}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. 01711223344"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Meeting Point</label>
          <select
            name="meetingPoint"
            value={form.meetingPoint}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Common Room">Common Room</option>
            <option value="Reception">Reception</option>
            <option value="Visitor Lounge">Visitor Lounge</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Reason for Visit</label>
          <input
            name="reason"
            value={form.reason}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Family visit"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Visit Date</label>
            <input
              type="date"
              name="visitDate"
              value={form.visitDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Visit Time</label>
            <input
              type="time"
              name="visitTime"
              value={form.visitTime}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>
      </form>
      <div>
        <h2 className="text-lg font-semibold mb-3">Visitor History</h2>
        {visitors.length === 0 ? (
          <EmptyState message="No visitor requests yet." />
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2">Visitor</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Meeting Point</th>
                  <th className="px-4 py-2">Reason</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v.id} className="border-t">
                    <td className="px-4 py-2">{v.visitorName}</td>
                    <td className="px-4 py-2">{v.visitorContact}</td>
                    <td className="px-4 py-2">{v.meetingPoint}</td>
                    <td className="px-4 py-2">{v.reason}</td>
                    <td className="px-4 py-2">{v.visitDate}</td>
                    <td className="px-4 py-2">{v.visitTime}</td>
                    <td className="px-4 py-2">
                      <StatusBadge status={v.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}