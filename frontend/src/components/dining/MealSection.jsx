export default function MealSection({ label, meal, icon }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold flex items-center gap-2">
          <span>{icon}</span> {label}
        </h3>
        <span className="text-blue-600 font-semibold">৳{meal?.price ?? "-"}</span>
      </div>
      <p className="text-gray-600 text-sm">{meal?.items || "Not published yet"}</p>
    </div>
  );
}