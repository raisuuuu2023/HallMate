import { useEffect, useState } from "react";
import { getAllMenus, deleteMenu } from "../../api/diningApi";
import MenuEditor from "../../components/dining/MenuEditor";
import Modal from "../../components/common/Modal";
import ConfirmDialogue from "../../components/common/ConfirmDialogue";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EmptyState from "../../components/common/EmptyState";

export default function ManageDining() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchMenus = () => {
    setLoading(true);

    getAllMenus()
      .then((res) => setMenus(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const openCreate = () => {
    setEditingMenu(null);
    setEditorOpen(true);
  };

  const openEdit = (menu) => {
    setEditingMenu(menu);
    setEditorOpen(true);
  };

  const handleSuccess = () => {
    setEditorOpen(false);
    fetchMenus();
  };

  const handleDelete = async () => {
    try {
      await deleteMenu(deleteId);

      setMenus((prev) =>
        prev.filter((menu) => menu.id !== deleteId)
      );
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Manage Dining Menu
        </h1>

        <button
          onClick={openCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Publish Menu
        </button>
      </div>

      {/* Menu Table */}
      {menus.length === 0 ? (
        <EmptyState message="No menus published yet." />
      ) : (
        <table className="w-full bg-white rounded-lg shadow-sm overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm text-gray-600">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Breakfast</th>
              <th className="p-3">Lunch</th>
              <th className="p-3">Dinner</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {menus.map((menu) => (
              <tr
                key={menu.id}
                className="border-t text-sm"
              >
                <td className="p-3">
                  {new Date(menu.date).toLocaleDateString()}
                </td>

                <td className="p-3">
                  ৳{menu.breakfast?.price}
                </td>

                <td className="p-3">
                  ৳{menu.lunch?.price}
                </td>

                <td className="p-3">
                  ৳{menu.dinner?.price}
                </td>

                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => openEdit(menu)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(menu.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Menu Editor Modal */}
      <Modal
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        title={editingMenu ? "Edit Menu" : "Publish Menu"}
      >
        <MenuEditor
          existingMenu={editingMenu}
          onSuccess={handleSuccess}
          onCancel={() => setEditorOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialogue
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this menu?"
      />
    </div>
  );
}