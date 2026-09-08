import z from "zod";

const envSchema = z.object({
  WORKOS_CLIENT_ID: z.string().min(1),
  WORKOS_API_KEY: z.string().min(1),
  WORKOS_TOKEN_AUDIENCE: z.string().min(1),
  WORKOS_TOKEN_ISSUER: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid env: ${parsed.error.message}`);
}

export const env = parsed.data;
