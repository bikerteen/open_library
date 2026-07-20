import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HomeSearch from "@/components/HomeSearch";
import ToolCard from "@/components/ToolCard";

export default async function Home() {
  const [featured, categoryRows, toolCount] = await Promise.all([
    prisma.tool.findMany({
      where: { featured: true },
      include: { tags: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.tool.findMany({ select: { category: true }, distinct: ["category"] }),
    prisma.tool.count(),
  ]);

  const categories = categoryRows.map((c) => c.category).sort();

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="blob-gradient pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
          <span className="animate-float mb-6 rounded-full border border-foreground/10 bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-muted">
            {toolCount > 0 ? `${toolCount} free tools and counting` : "Just getting started"}
          </span>

          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl">
            Every great tool,
            <br />
            <span className="text-gradient">without the price tag.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-foreground/70 sm:text-lg">
            The Library of Alexandria for open source — free, honest alternatives to
            expensive software. No jargon, no accounts, no catch.
          </p>

          <div className="mt-9 w-full">
            <HomeSearch />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-muted">Popular:</span>
            {["Design", "3D & Animation", "Video Editing", "Writing"].map((c) => (
              <Link
                key={c}
                href={`/library?category=${encodeURIComponent(c)}`}
                className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-semibold text-foreground/70 hover:bg-foreground/10"
              >
                {c}
              </Link>
            ))}
          </div>

          <Link
            href="/library"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-bold text-background shadow-lg shadow-foreground/10 transition-transform hover:scale-105 active:scale-95"
          >
            Browse the full library
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-10">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/library?category=${encodeURIComponent(category)}`}
                className="rounded-2xl border border-foreground/8 bg-surface px-4 py-2 text-sm font-semibold text-foreground/80 transition-colors hover:border-brand-lilac hover:text-foreground"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">Staff picks ✨</h2>
            <Link href="/library" className="text-sm font-bold text-brand-pink hover:underline">
              See everything →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={{
                  ...tool,
                  createdAt: tool.createdAt.toISOString(),
                  updatedAt: tool.updatedAt.toISOString(),
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
