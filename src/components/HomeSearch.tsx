"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ToolWithTags } from "@/lib/types";

const PROMPTS = [
  "design tools",
  "i want to make a 3d illustration",
  "edit a podcast",
  "write a novel",
  "protect my passwords",
  "edit video like a pro",
];

export default function HomeSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToolWithTags[]>([]);
  const [open, setOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(PROMPTS[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % PROMPTS.length;
      setPlaceholder(PROMPTS[i]);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const trimmed = query.trim();

    if (!trimmed) {
      const id = setTimeout(() => setResults([]), 0);
      return () => clearTimeout(id);
    }

    const id = setTimeout(async () => {
      try {
        const res = await fetch(`/api/tools/search?q=${encodeURIComponent(trimmed)}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data.tools ?? []);
      } catch {
        // ignore aborted / failed requests
      }
    }, 200);
    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [query]);

  function goToLibrary(q: string) {
    router.push(`/library?q=${encodeURIComponent(q)}`);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToLibrary(query);
        }}
        className="relative flex items-center gap-2 rounded-full border border-foreground/10 bg-surface p-2 shadow-lg shadow-foreground/5 focus-within:border-brand-lilac"
      >
        <span className="pl-3 text-xl">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={`Try "${placeholder}"`}
          className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-base outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-transform hover:scale-105 active:scale-95"
        >
          Search
        </button>
      </form>

      {open && query.trim() && (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-3xl border border-foreground/10 bg-surface shadow-xl">
          {results.length === 0 ? (
            <p className="px-5 py-4 text-sm text-muted">No matches yet — try another word, or browse the full library.</p>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-2">
              {results.map((tool) => (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => goToLibrary(tool.name)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-foreground/5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background text-lg">
                      {tool.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold">{tool.name}</span>
                      <span className="block truncate text-xs text-muted">{tool.tagline}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            onClick={() => goToLibrary(query)}
            className="w-full border-t border-foreground/8 px-4 py-3 text-left text-sm font-bold text-brand-pink hover:bg-foreground/5"
          >
            See all results for &ldquo;{query}&rdquo; →
          </button>
        </div>
      )}
    </div>
  );
}
