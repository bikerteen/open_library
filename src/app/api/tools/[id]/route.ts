import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toolInputSchema } from "@/lib/validation";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/tools/[id]">) {
  const { id } = await ctx.params;
  const tool = await prisma.tool.findUnique({ where: { id }, include: { tags: true } });
  if (!tool) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ tool });
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/tools/[id]">) {
  const { id } = await ctx.params;
  const body = await request.json().catch(() => null);
  const parsed = toolInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { tags, ...data } = parsed.data;

  const tool = await prisma.tool
    .update({
      where: { id },
      data: {
        ...data,
        tags: {
          set: [],
          connectOrCreate: tags.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { tags: true },
    })
    .catch(() => null);

  if (!tool) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ tool });
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/tools/[id]">) {
  const { id } = await ctx.params;
  await prisma.tool.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
