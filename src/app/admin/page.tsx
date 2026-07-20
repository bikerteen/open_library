import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminToolsTable from "@/components/AdminToolsTable";
import LogoutButton from "@/components/LogoutButton";

export const metadata = {
  title: "Admin — The Open Library",
};

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const tools = await prisma.tool.findMany({
    include: { tags: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const serialized = tools.map((tool) => ({
    ...tool,
    createdAt: tool.createdAt.toISOString(),
    updatedAt: tool.updatedAt.toISOString(),
  }));

  return (
    <div className="mx-auto max-w-4xl px-5 py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Curator&apos;s desk 🛠️</h1>
          <p className="mt-1 text-sm text-muted">{tools.length} tools in the library</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/tools/new"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-transform hover:scale-105"
          >
            + Add tool
          </Link>
          <LogoutButton />
        </div>
      </div>

      <AdminToolsTable tools={serialized} />
    </div>
  );
}
