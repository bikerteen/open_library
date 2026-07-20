"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ToolWithTags } from "@/lib/types";

export default function AdminToolsTable({ tools }: { tools: ToolWithTags[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(tool: ToolWithTags) {
    if (!confirm(`Delete "${tool.name}"? This can't be undone.`)) return;
    setDeletingId(tool.id);
    await fetch(`/api/tools/${tool.id}`, { method: "DELETE" });
    setDeletingId(null);
    router.refresh();
  }

  if (tools.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-foreground/15 py-16 text-center">
        <p className="text-2xl">📭</p>
        <p className="mt-3 font-display text-lg font-bold">No tools yet</p>
        <p className="mt-1 text-sm text-muted">Add your first tool to populate the library.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-foreground/8 bg-surface">
      <ul className="divide-y divide-foreground/8">
        {tools.map((tool) => (
          <li key={tool.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-lg">
              {tool.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 truncate font-bold">
                {tool.name}
                {tool.featured && (
                  <span className="rounded-full bg-brand-yellow/70 px-2 py-0.5 text-[10px] font-bold uppercase">
                    Featured
                  </span>
                )}
              </p>
              <p className="truncate text-sm text-muted">
                {tool.category} · {tool.tagline}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href={`/admin/tools/${tool.id}/edit`}
                className="rounded-full border border-foreground/10 px-4 py-1.5 text-xs font-bold hover:border-brand-lilac"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(tool)}
                disabled={deletingId === tool.id}
                className="rounded-full border border-foreground/10 px-4 py-1.5 text-xs font-bold text-brand-pink hover:border-brand-pink disabled:opacity-50"
              >
                {deletingId === tool.id ? "Deleting…" : "Delete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
