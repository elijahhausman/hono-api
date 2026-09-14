import { loadEnv } from "@workspace/env";
import { z } from "zod";

export const env = loadEnv(
	z.object({
		DATABASE_URL: z.string().min(1),
		NEXT_PUBLIC_APP_URL: z.url(),
	}),
);
