import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import EmptyState from "../../components/common/EmptyState";
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

export default function StudentEvents() {
  const { user } = useAuth();
  const [events, setEvents] = useState(initialEvents);

  const toggleRsvp = (id) => {
    setEvents(
      events.map((e) => {
        if (e.id !== id) return e;
        const isAttending = e.attendees.includes(user?.name);
        return {
          ...e,
          attendees: isAttending
            ? e.attendees.filter((name) => name !== user?.name)
            : [...e.attendees, user?.name],
        };
      })
    );
  };

  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.eventDate >= today);
  const past = events.filter((e) => e.eventDate < today);

  const renderEvent = (e) => {
    const isAttending = e.attendees.includes(user?.name);
    const isPast = e.eventDate < today;

    return (
      <div key={e.id} className="bg-white p-5 rounded-lg shadow space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{e.title}</h3>
          {!isPast && (
            <button
              onClick={() => toggleRsvp(e.id)}
              className={`text-xs px-3 py-1 rounded ${
                isAttending ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {isAttending ? "Attending ✓" : "RSVP"}
            </button>
          )}
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
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Events</h1>

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
    </div>
  );
}