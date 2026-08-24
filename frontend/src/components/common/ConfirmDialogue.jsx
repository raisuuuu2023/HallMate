import Modal from "./Modal";

export default function ConfirmDialog({ isOpen, onClose, onConfirm, message }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Action">
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
}