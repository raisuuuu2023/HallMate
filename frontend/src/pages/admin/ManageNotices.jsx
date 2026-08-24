import { useState } from "react";
import NoticeBoard from "../../components/notices/NoticeBoard";
import NoticeForm from "../../components/notices/NoticeForm";
import Modal from "../../components/common/Modal";

export default function ManageNotices() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // forces NoticeBoard to refetch

  const openCreate = () => {
    setEditingNotice(null);
    setModalOpen(true);
  };

  const openEdit = (notice) => {
    setEditingNotice(notice);
    setModalOpen(true);
  };

  const handleSuccess = () => {
    setModalOpen(false);
    setRefreshKey((k) => k + 1); // remounts NoticeBoard -> triggers fetchNotices again
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Notices</h1>
        <button onClick={openCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          + New Notice
        </button>
      </div>

      <NoticeBoard key={refreshKey} isAdmin={true} onEdit={openEdit} />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingNotice ? "Edit Notice" : "Post Notice"}
      >
        <NoticeForm
          existingNotice={editingNotice}
          onSuccess={handleSuccess}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}