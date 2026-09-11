import { prisma } from "../lib/prisma.ts";

export async function getOutings() {
  return await prisma.outing.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getOutingById(id: string) {
  return await prisma.outing.findUnique({
    where: { id },
  });
}
