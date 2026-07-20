import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!q) {
    return NextResponse.json({ tools: [] });
  }

  const tools = await prisma.tool.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { tagline: { contains: q } },
        { description: { contains: q } },
        { category: { contains: q } },
        { tags: { some: { name: { contains: q } } } },
      ],
    },
    include: { tags: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 8,
  });

  return NextResponse.json({ tools });
}
