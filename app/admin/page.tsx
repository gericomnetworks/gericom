import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  // Server component: safe to use Prisma here
  const productsCount = await prisma.product.count().catch(() => 0);
  const usersCount = await prisma.user?.count?.().catch(() => 0);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Products</p>
          <p className="text-2xl font-semibold">{productsCount}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Users</p>
          <p className="text-2xl font-semibold">{usersCount ?? 0}</p>
        </div>
      </div>
    </section>
  );
}