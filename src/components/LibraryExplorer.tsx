"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { ToolWithTags } from "@/lib/types";
import ToolCard from "./ToolCard";
import TagPill from "./TagPill";

export default function LibraryExplorer({
  tools,
  categories,
  tags,
}: {
  tools: ToolWithTags[];
  categories: string[];
  tags: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [activeTags, setActiveTags] = useState<string[]>(
    searchParams.get("tag") ? [searchParams.get("tag") as string] : []
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    if (activeTags.length) params.set("tag", activeTags[0]);
    const qs = params.toString();
    router.replace(qs ? `/library?${qs}` : "/library", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, activeTags]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (category && tool.category !== category) return false;
      if (activeTags.length && !activeTags.every((t) => tool.tags.some((tt) => tt.name === t))) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        tool.name,
        tool.tagline,
        tool.description,
        tool.category,
        ...tool.tags.map((t) => t.name),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [tools, query, category, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  const hasFilters = query || category || activeTags.length > 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg">
            🔍
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the whole library…"
            className="w-full rounded-full border border-foreground/10 bg-surface py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-lilac"
          />
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
              setActiveTags([]);
            }}
            className="shrink-0 rounded-full border border-foreground/10 px-4 py-3 text-sm font-semibold text-muted hover:text-foreground"
          >
            Clear filters
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          <TagPill active={category === ""} onClick={() => setCategory("")}>
            All categories
          </TagPill>
          {categories.map((c) => (
            <TagPill key={c} active={category === c} onClick={() => setCategory(category === c ? "" : c)}>
              {c}
            </TagPill>
          ))}
        </div>
      )}

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)}>
              #{t}
            </TagPill>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm font-semibold text-muted">
        {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-foreground/15 py-16 text-center">
          <p className="text-2xl">🕵️</p>
          <p className="mt-3 font-display text-lg font-bold">Nothing here yet</p>
          <p className="mt-1 text-sm text-muted">Try a different search, or clear your filters.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
