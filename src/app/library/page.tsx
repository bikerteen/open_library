import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import LibraryExplorer from "@/components/LibraryExplorer";

export const metadata = {
  title: "Library — The Open Library",
};

export const dynamic = "force-dynamic";

async function LibraryContent() {
  const [tools, categoryRows, tagRows] = await Promise.all([
    prisma.tool.findMany({
      include: { tags: true },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
    prisma.tool.findMany({ select: { category: true }, distinct: ["category"] }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  const categories = categoryRows.map((c) => c.category).sort();
  const tags = tagRows.map((t) => t.name);

  const serialized = tools.map((tool) => ({
    ...tool,
    createdAt: tool.createdAt.toISOString(),
    updatedAt: tool.updatedAt.toISOString(),
  }));

  return <LibraryExplorer tools={serialized} categories={categories} tags={tags} />;
}

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">The whole library 📖</h1>
        <p className="mt-2 text-foreground/70">
          Every tool we&apos;ve found worth using — free, open, and ready to go.
        </p>
      </div>
      <Suspense fallback={<p className="text-center text-muted">Loading…</p>}>
        <LibraryContent />
      </Suspense>
    </div>
  );
}
