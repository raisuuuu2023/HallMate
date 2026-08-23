export default function EmptyState({ message = "No data found." }) {
  return (
    <div className="text-center py-12 text-gray-400">
      <p>{message}</p>
    </div>
  );
}