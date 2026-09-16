import { loadEnv } from "@workspace/env";
import { z } from "zod";

export const env = loadEnv(
	z.object({
		WORKOS_CLIENT_ID: z.string().min(1),
		WORKOS_API_KEY: z.string().min(1),
		WORKOS_COOKIE_PASSWORD: z.string().min(1),
		NEXT_PUBLIC_WORKOS_REDIRECT_URI: z.url(),
		NEXT_PUBLIC_APP_URL: z.url(),
		NEXT_PUBLIC_API_URL: z.url(),
	}),
);
