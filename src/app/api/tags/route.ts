import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ tags });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const tag = await prisma.tag.upsert({
    where: { name },
    update: {},
    create: { name },
  });

  return NextResponse.json({ tag }, { status: 201 });
}
