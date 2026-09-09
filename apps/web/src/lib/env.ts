import z from "zod";

const envSchema = z.object({
	WORKOS_CLIENT_ID: z.string().min(1),
	WORKOS_API_KEY: z.string().min(1),
	WORKOS_COOKIE_PASSWORD: z.string().min(1),
	NEXT_PUBLIC_WORKOS_REDIRECT_URI: z.string().min(1),
	NEXT_PUBLIC_APP_URL: z.string().min(1),
	NEXT_PUBLIC_API_URL: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	throw new Error(`Invalid env: ${parsed.error.message}`);
}

export const env = parsed.data;
