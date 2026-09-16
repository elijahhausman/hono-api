import { z } from "zod";

// Outing status

export const outingStatusSchema = z.enum(["DRAFT", "PUBLISHED", "CLOSED"]);
export type OutingStatus = z.infer<typeof outingStatusSchema>;

// Outing

export const outingSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	status: outingStatusSchema,
});

export type Outing = z.infer<typeof outingSchema>;

// Update outing

export const createOutingSchema = outingSchema.omit({ id: true });

export type CreateOuting = z.infer<typeof createOutingSchema>;
