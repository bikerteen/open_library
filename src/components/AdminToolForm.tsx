"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ToolWithTags } from "@/lib/types";
import { PRICING_OPTIONS } from "@/lib/validation";

export default function AdminToolForm({
  initialTool,
  existingCategories,
  existingTags,
}: {
  initialTool?: ToolWithTags;
  existingCategories: string[];
  existingTags: string[];
}) {
  const router = useRouter();
  const isEdit = Boolean(initialTool);

  const [name, setName] = useState(initialTool?.name ?? "");
  const [tagline, setTagline] = useState(initialTool?.tagline ?? "");
  const [description, setDescription] = useState(initialTool?.description ?? "");
  const [url, setUrl] = useState(initialTool?.url ?? "");
  const [category, setCategory] = useState(initialTool?.category ?? "");
  const [pricing, setPricing] = useState(initialTool?.pricing ?? PRICING_OPTIONS[0]);
  const [icon, setIcon] = useState(initialTool?.icon ?? "✨");
  const [featured, setFeatured] = useState(initialTool?.featured ?? false);
  const [tagsInput, setTagsInput] = useState(initialTool?.tags.map((t) => t.name).join(", ") ?? "");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name,
      tagline,
      description,
      url,
      category,
      pricing,
      icon,
      featured,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const res = await fetch(isEdit ? `/api/tools/${initialTool!.id}` : "/api/tools", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Please check the form and try again.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-foreground/8 bg-surface p-6 shadow-sm sm:p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold sm:col-span-2">
          Icon (emoji)
          <input
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            maxLength={4}
            className="mt-1.5 w-24 rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-center text-xl outline-none focus:border-brand-lilac"
          />
        </label>

        <label className="block text-sm font-semibold sm:col-span-2">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
          />
        </label>

        <label className="block text-sm font-semibold sm:col-span-2">
          Tagline
          <input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
            placeholder="One short sentence — shown on the card"
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
          />
        </label>

        <label className="block text-sm font-semibold sm:col-span-2">
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
          />
        </label>

        <label className="block text-sm font-semibold sm:col-span-2">
          Website URL
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            type="url"
            placeholder="https://example.com"
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
          />
        </label>

        <label className="block text-sm font-semibold">
          Category
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            list="category-options"
            placeholder="e.g. Design & Graphics"
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
          />
          <datalist id="category-options">
            {existingCategories.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </label>

        <label className="block text-sm font-semibold">
          Pricing
          <select
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
          >
            {PRICING_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-semibold sm:col-span-2">
          Tags <span className="font-normal text-muted">(comma separated — new ones are created automatically)</span>
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            list="tag-options"
            placeholder="3d, modeling, beginner-friendly"
            className="mt-1.5 w-full rounded-2xl border border-foreground/10 bg-background px-4 py-2.5 text-sm outline-none focus:border-brand-lilac"
          />
          <datalist id="tag-options">
            {existingTags.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </label>

        <label className="flex items-center gap-2 text-sm font-semibold sm:col-span-2">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="h-4 w-4 rounded border-foreground/20"
          />
          Feature this tool on the homepage
        </label>
      </div>

      {error && <p className="mt-5 text-sm font-semibold text-brand-pink">{error}</p>}

      <div className="mt-7 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-foreground px-6 py-3 text-sm font-bold text-background transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {loading ? "Saving…" : isEdit ? "Save changes" : "Add tool"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="rounded-full px-6 py-3 text-sm font-semibold text-muted hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
