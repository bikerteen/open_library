import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminToolForm from "@/components/AdminToolForm";

export const metadata = {
  title: "Edit tool — The Open Library",
};

export default async function EditToolPage(ctx: PageProps<"/admin/tools/[id]/edit">) {
  const { id } = await ctx.params;

  const [tool, categoryRows, tagRows] = await Promise.all([
    prisma.tool.findUnique({ where: { id }, include: { tags: true } }),
    prisma.tool.findMany({ select: { category: true }, distinct: ["category"] }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!tool) notFound();

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <Link href="/admin" className="text-sm font-semibold text-muted hover:text-foreground">
        ← Back to dashboard
      </Link>
      <h1 className="mt-3 mb-8 font-display text-3xl font-bold">Edit {tool.name}</h1>
      <AdminToolForm
        initialTool={{
          ...tool,
          createdAt: tool.createdAt.toISOString(),
          updatedAt: tool.updatedAt.toISOString(),
        }}
        existingCategories={categoryRows.map((c) => c.category).sort()}
        existingTags={tagRows.map((t) => t.name)}
      />
    </div>
  );
}
