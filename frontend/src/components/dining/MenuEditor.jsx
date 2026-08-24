import { useState, useEffect } from "react";
import { createOrUpdateMenu } from "../../api/diningApi";

const emptyMeal = { items: "", price: "" };

export default function MenuEditor({ existingMenu, onSuccess, onCancel }) {
  const [date, setDate] = useState(existingMenu?.date || "");
  const [breakfast, setBreakfast] = useState(existingMenu?.breakfast || emptyMeal);
  const [lunch, setLunch] = useState(existingMenu?.lunch || emptyMeal);
  const [dinner, setDinner] = useState(existingMenu?.dinner || emptyMeal);
  const [error, setError] = useState("");

  useEffect(() => {
    if (existingMenu) {
      setDate(existingMenu.date);
      setBreakfast(existingMenu.breakfast || emptyMeal);
      setLunch(existingMenu.lunch || emptyMeal);
      setDinner(existingMenu.dinner || emptyMeal);
    }
  }, [existingMenu]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!date) {
      setError("Please select a date");
      return;
    }

    try {
      await createOrUpdateMenu({
        date,
        breakfast: { ...breakfast, price: Number(breakfast.price) || 0 },
        lunch: { ...lunch, price: Number(lunch.price) || 0 },
        dinner: { ...dinner, price: Number(dinner.price) || 0 },
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save menu");
    }
  };

  // reusable inline editor for one meal — avoids repeating the same
  // two-input block three times
  const MealInputs = ({ label, value, setValue }) => (
    <div className="border rounded p-3 space-y-2">
      <p className="font-medium text-sm">{label}</p>
      <input
        type="text"
        placeholder="Menu items (e.g. Rice, Fish curry, Dal)"
        value={value.items}
        onChange={(e) => setValue({ ...value, items: e.target.value })}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
      <input
        type="number"
        placeholder="Price (৳)"
        value={value.price}
        onChange={(e) => setValue({ ...value, price: e.target.value })}
        className="w-full border rounded px-3 py-2 text-sm"
        required
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm text-gray-600 mb-1">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border rounded px-3 py-2"
          disabled={!!existingMenu} // don't allow changing the date when editing
          required
        />
      </div>

      <MealInputs label="🍳 Breakfast" value={breakfast} setValue={setBreakfast} />
      <MealInputs label="🍛 Lunch" value={lunch} setValue={setLunch} />
      <MealInputs label="🍽️ Dinner" value={dinner} setValue={setDinner} />

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          {existingMenu ? "Update" : "Publish"} Menu
        </button>
      </div>
    </form>
  );
}