import MealSection from "./MealSection";

export default function MenuCard({ menu }) {
  if (!menu) {
    return (
      <div className="text-center text-gray-400 py-10">
        Menu not published for this date yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        {new Date(menu.date).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>

      <MealSection label="Breakfast" meal={menu.breakfast} icon="🍳" />
      <MealSection label="Lunch" meal={menu.lunch} icon="🍛" />
      <MealSection label="Dinner" meal={menu.dinner} icon="🍽️" />
    </div>
  );
}