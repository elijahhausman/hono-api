import { z } from "zod";

export const createOutingSchema = z.object({
	name: z.string().min(1),
});

export type CreateOutingSchema = z.infer<typeof createOutingSchema>;
