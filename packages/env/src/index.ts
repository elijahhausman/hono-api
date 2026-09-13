import type { z } from "zod";

export function loadEnv<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
	const parsed = schema.safeParse(process.env);

	if (!parsed.success) {
		throw new Error(`Invalid env: ${parsed.error.message}`);
	}

	return parsed.data;
}
