import { useState, useEffect } from "react";
import { createNotice, updateNotice } from "../../api/noticeApi";

export default function NoticeForm({ existingNotice, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
  });
  const [error, setError] = useState("");

  // pre-fill form when editing an existing notice
  useEffect(() => {
    if (existingNotice) {
      setFormData({
        title: existingNotice.title,
        content: existingNotice.content,
        category: existingNotice.category,
      });
    }
  }, [existingNotice]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (existingNotice) {
        await updateNotice(existingNotice.id, formData);
      } else {
        await createNotice(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save notice");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="text"
        name="title"
        placeholder="Notice Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
        required
      />

      <textarea
        name="content"
        placeholder="Notice content..."
        value={formData.content}
        onChange={handleChange}
        rows={4}
        className="w-full border rounded px-3 py-2"
        required
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      >
        <option value="general">General</option>
        <option value="maintenance">Maintenance</option>
        <option value="emergency">Emergency</option>
        <option value="event">Event</option>
        <option value="other">Other</option>
      </select>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {existingNotice ? "Update" : "Post"} Notice
        </button>
      </div>
    </form>
  );
}