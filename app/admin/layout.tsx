export const metadata = {
  title: "Admin - Gericom Networks",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900">
      <header className="border-b p-4 bg-white shadow-sm">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      </header>

      <main className="p-4">{children}</main>
    </div>
  );
}