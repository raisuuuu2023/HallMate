import { useEffect, useState } from "react";
import { getMenuByDate } from "../../api/diningApi";
import MenuCard from "../../components/dining/MenuCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const todayStr = () => new Date().toISOString().split("T")[0];

export default function DiningMenuPage() {
  const [date, setDate] = useState(todayStr());
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMenuByDate(date)
      .then((res) => setMenu(res.data))
      .catch(() => setMenu(null)) // no menu published for that date
      .finally(() => setLoading(false));
  }, [date]);

  return (
    <div className="max-w-lg space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dining Menu</h1>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        />
      </div>

      {loading ? <LoadingSpinner /> : <MenuCard menu={menu} />}
    </div>
  );
}