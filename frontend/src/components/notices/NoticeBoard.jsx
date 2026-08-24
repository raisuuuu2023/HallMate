import { useEffect, useState } from "react";
import { getNotices, deleteNotice } from "../../api/noticeApi";
import NoticeCard from "./NoticeCard";
import LoadingSpinner from "../common/LoadingSpinner";
import EmptyState from "../common/EmptyState";
import ConfirmDialogue from "../common/ConfirmDialogue";

export default function NoticeBoard({ isAdmin = false, onEdit }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchNotices = async () => {
    setLoading(true);

    try {
      const res = await getNotices();
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to fetch notices", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteNotice(deleteId);

      setNotices((prev) =>
        prev.filter((notice) => notice.id !== deleteId)
      );
    } catch (err) {
      console.error("Failed to delete notice", err);
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (notices.length === 0) {
    return <EmptyState message="No notices posted yet." />;
  }

  return (
    <div className="space-y-3">
      {notices.map((notice) => (
        <NoticeCard
          key={notice.id}
          notice={notice}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={(id) => setDeleteId(id)}
        />
      ))}

      <ConfirmDialogue
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this notice?"
      />
    </div>
  );
}