import { prisma } from "../lib/prisma.ts";

export async function getOutings() {
	return await prisma.outing.findMany({
		orderBy: { createdAt: "desc" },
	});
}
