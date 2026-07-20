import type { ToolWithTags } from "@/lib/types";
import TagPill from "./TagPill";

const CARD_ACCENTS = [
  "from-brand-lilac/25 to-transparent",
  "from-brand-pink/25 to-transparent",
  "from-brand-mint/25 to-transparent",
  "from-brand-blue/25 to-transparent",
  "from-brand-yellow/30 to-transparent",
];

function accentFor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash + id.charCodeAt(i)) % CARD_ACCENTS.length;
  return CARD_ACCENTS[hash];
}

export default function ToolCard({ tool }: { tool: ToolWithTags }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/8 bg-surface p-5 shadow-[0_1px_0_rgba(23,21,31,0.04)] transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-lilac/10"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accentFor(tool.id)} opacity-0 transition-opacity group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-background text-2xl">
          {tool.icon}
        </span>
        {tool.featured && (
          <span className="rounded-full bg-brand-yellow/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-foreground">
            Featured
          </span>
        )}
      </div>

      <h3 className="relative mt-4 font-display text-lg font-bold leading-tight">
        {tool.name}
      </h3>
      <p className="relative mt-1 text-sm font-medium text-muted">{tool.tagline}</p>
      <p className="relative mt-3 line-clamp-3 text-sm text-foreground/70">
        {tool.description}
      </p>

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        <TagPill>{tool.category}</TagPill>
        <TagPill>{tool.pricing}</TagPill>
      </div>

      {tool.tags.length > 0 && (
        <div className="relative mt-2 flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 4).map((tag) => (
            <span key={tag.id} className="text-xs font-medium text-foreground/40">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      <span className="relative mt-4 inline-flex items-center gap-1 text-sm font-bold text-foreground transition-colors group-hover:text-brand-pink">
        Visit tool
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path
            d="M7 17L17 7M17 7H8M17 7V16"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
