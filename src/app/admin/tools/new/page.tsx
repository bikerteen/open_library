import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminToolForm from "@/components/AdminToolForm";

export const metadata = {
  title: "Add a tool — The Open Library",
};

export default async function NewToolPage() {
  const [categoryRows, tagRows] = await Promise.all([
    prisma.tool.findMany({ select: { category: true }, distinct: ["category"] }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <Link href="/admin" className="text-sm font-semibold text-muted hover:text-foreground">
        ← Back to dashboard
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl font-bold">Add a new tool</h1>
      <AdminToolForm
        existingCategories={categoryRows.map((c) => c.category).sort()}
        existingTags={tagRows.map((t) => t.name)}
      />
    </div>
  );
}
