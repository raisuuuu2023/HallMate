import { useState } from "react";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";
import Pagination from "../../components/common/Pagination";

export default function StudentDashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Component Test</h1>

      <div className="flex gap-2">
        <StatusBadge status="Pending" />
        <StatusBadge status="Completed" />
        <StatusBadge status="Fine" />
      </div>

      <button onClick={() => setModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
        Open Modal
      </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Test Modal">
        <p>This is modal content.</p>
      </Modal>

      <LoadingSpinner />
      <EmptyState message="No complaints yet." />
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />
    </div>
  );
}