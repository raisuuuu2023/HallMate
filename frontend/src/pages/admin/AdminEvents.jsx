import { useState } from "react";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialogue";
const initialEvents = [
  {
    id: 1,
    title: "Cultural Night",
    description: "An evening of music, dance, and food to celebrate hall culture.",
    eventDate: "2026-08-10",
    eventTime: "19:00",
    venue: "Hall Auditorium",
    attendees: ["Test User"],
  },
  {
    id: 2,
    title: "Blood Donation Camp",
    description: "Voluntary blood donation drive organized by the hall committee.",
    eventDate: "2026-09-12",
    eventTime: "10:00",
    venue: "Common Room",
    attendees: [],
  },
];

export default function AdminEvents() {
  const [events, setEvents] = useState(initialEvents);
  const [form, setForm] = useState({
    title: "",
    description: "",
    eventDate: "",
    eventTime: "",
    venue: "",
  });
  const [deleteId, setDeleteId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.eventDate || !form.eventTime || !form.venue) {
      alert("Please fill in all fields.");
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...form,
      attendees: [],
    };

    setEvents([newEvent, ...events]);
    setForm({ title: "", description: "", eventDate: "", eventTime: "", venue: "" });
  };

  const handleDelete = () => {
    setEvents(events.filter((e) => e.id !== deleteId));
    setDeleteId(null);
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.eventDate >= today);
  const past = events.filter((e) => e.eventDate < today);

  const renderEvent = (e) => (
    <div key={e.id} className="bg-white p-5 rounded-lg shadow space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg">{e.title}</h3>
        <button
          onClick={() => setDeleteId(e.id)}
          className="text-xs bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
      <p className="text-sm text-gray-600">{e.description}</p>
      <div className="text-sm text-gray-500 flex gap-4">
        <span>📅 {e.eventDate}</span>
        <span>🕒 {e.eventTime}</span>
        <span>📍 {e.venue}</span>
      </div>
      <p className="text-xs text-gray-400">{e.attendees.length} attending</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Events</h1>

      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4 max-w-lg">
        <h2 className="text-lg font-semibold">Create New Event</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Cultural Night"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
            placeholder="Short description of the event"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Time</label>
            <input
              type="time"
              name="eventTime"
              value={form.eventTime}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Venue</label>
          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Hall Auditorium"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Event
        </button>
      </form>

      
      <div>
        <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
        {upcoming.length === 0 ? (
          <EmptyState message="No upcoming events." />
        ) : (
          <div className="space-y-4">{upcoming.map(renderEvent)}</div>
        )}
      </div>

      
      <div>
        <h2 className="text-lg font-semibold mb-3">Past Events</h2>
        {past.length === 0 ? (
          <EmptyState message="No past events." />
        ) : (
          <div className="space-y-4">{past.map(renderEvent)}</div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this event?"
      />
    </div>
  );
}