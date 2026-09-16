import type { CreateOuting } from "@workspace/schemas";
import { Prisma } from "../generated/prisma/client.ts";
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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error(`An error has occured: "${error.message}" (${error.code})`);
		}

		return [];
	}
}
