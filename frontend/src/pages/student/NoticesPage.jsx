import NoticeBoard from "../../components/notices/NoticeBoard";

export default function NoticesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Notice Board</h1>
      <NoticeBoard isAdmin={false} />
    </div>
  );
}