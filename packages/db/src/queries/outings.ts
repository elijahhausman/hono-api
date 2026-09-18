import type { CreateOuting, UpdateOuting } from "@workspace/schemas";
import { safePrisma } from "../lib/errors.ts";
import { prisma } from "../lib/prisma.ts";

export const getOutings = safePrisma(async () => {
	return await prisma.outing.findMany({
		orderBy: { createdAt: "desc" },
	});
});

export const getOuting = safePrisma(async (id: string) => {
	return await prisma.outing.findUnique({
		where: { id },
	});
});

export const createOuting = safePrisma(async (data: CreateOuting) => {
	return await prisma.outing.create({ data });
});

export const updateOuting = safePrisma(
	async (id: string, data: UpdateOuting) => {
		await prisma.outing.update({
			where: { id },
			data,
		});
	},
);

export const deleteOuting = safePrisma(async (id: string) => {
	await prisma.outing.delete({
		where: { id },
	});
});
