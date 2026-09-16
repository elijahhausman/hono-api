import { z } from "zod";

export const outingStatusSchema = z.enum(["DRAFT", "PUBLISHED", "CLOSED"]);
export type OutingStatus = z.infer<typeof outingStatusSchema>;

export const createOutingSchema = z.object({
	title: z.string().min(1),
	description: z.string().min(1),
	status: outingStatusSchema,
});
export type CreateOuting = z.infer<typeof createOutingSchema>;
