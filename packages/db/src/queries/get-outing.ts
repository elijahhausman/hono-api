import { prisma } from "../lib/prisma.ts";

export async function getOuting(id: string) {
	return await prisma.outing.findUnique({
		where: { id },
	});
}
