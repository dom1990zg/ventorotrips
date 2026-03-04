export default function DevBadge() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xl">
      DEV MODE
    </div>
  );
}