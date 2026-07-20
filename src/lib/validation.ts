import { z } from "zod";

export const PRICING_OPTIONS = [
  "Free & Open Source",
  "Free",
  "Freemium",
  "Open Source (self-hosted)",
] as const;

export const toolInputSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  tagline: z.string().trim().min(1, "Tagline is required").max(140),
  description: z.string().trim().min(1, "Description is required").max(2000),
  url: z.string().trim().url("Must be a valid URL"),
  category: z.string().trim().min(1, "Category is required").max(60),
  pricing: z.string().trim().min(1).max(60).default("Free & Open Source"),
  icon: z.string().trim().min(1).max(8).default("✨"),
  featured: z.boolean().default(false),
  tags: z.array(z.string().trim().min(1).max(40)).default([]),
});

export type ToolInput = z.infer<typeof toolInputSchema>;
