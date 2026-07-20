import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function resolveDatabaseUrl() {
  const raw = process.env.DATABASE_URL ?? "file:./dev.db";
  if (raw.startsWith("file:") && !raw.startsWith("file:/")) {
    const relative = raw.slice("file:".length);
    return `file:${path.join(process.cwd(), "prisma", relative)}`;
  }
  return raw;
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({ datasourceUrl: resolveDatabaseUrl() });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
