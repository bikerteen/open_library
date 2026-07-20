import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [tools, tags] = await Promise.all([
    prisma.tool.findMany({ select: { category: true } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  const categories = Array.from(new Set(tools.map((t) => t.category))).sort();

  return NextResponse.json({ categories, tags });
}
