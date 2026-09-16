import { handlePrismaError } from "../lib/errors.ts";
import { prisma } from "../lib/prisma.ts";

export async function getOutings() {
	try {
		return await prisma.outing.findMany({
			orderBy: { createdAt: "desc" },
		});
	} catch (error: unknown) {
		const data = handlePrismaError(error);

		if (data) {
			return data;
		}

		throw error;
	}
}
