import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toolInputSchema } from "@/lib/validation";

export async function GET() {
  const tools = await prisma.tool.findMany({
    include: { tags: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ tools });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = toolInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { tags, ...data } = parsed.data;

  const tool = await prisma.tool.create({
    data: {
      ...data,
      tags: {
        connectOrCreate: tags.map((name) => ({
          where: { name },
          create: { name },
        })),
      },
    },
    include: { tags: true },
  });

  return NextResponse.json({ tool }, { status: 201 });
}
