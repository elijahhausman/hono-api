import { handlePrismaError } from "../lib/errors.ts";
import { prisma } from "../lib/prisma.ts";

export async function getOuting(id: string) {
	try {
		return await prisma.outing.findUnique({
			where: { id },
		});
	} catch (error: unknown) {
		const data = handlePrismaError(error);

		if (data) {
			return data;
		}

		throw error;
	}
}
