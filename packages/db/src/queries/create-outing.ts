import type { CreateOuting } from "@workspace/schemas";
import { handlePrismaError } from "../lib/errors.ts";
import { prisma } from "../lib/prisma.ts";

export async function createOuting(data: CreateOuting) {
	try {
		return await prisma.outing.create({
			data: {
				id: "test",
				...data,
			},
		});
	} catch (error: unknown) {
		const data = handlePrismaError(error);

		if (data) {
			return data;
		}

		throw error;
	}
}
