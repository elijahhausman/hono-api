import { loadEnv } from "@repo/env";
import z from "zod";

export const env = loadEnv(
  z.object({
    WORKOS_CLIENT_ID: z.string().min(1),
    WORKOS_API_KEY: z.string().min(1),
    WORKOS_TOKEN_AUDIENCE: z.string().min(1),
    WORKOS_TOKEN_ISSUER: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
    PORT: z.coerce.number().default(3001),
  }),
);
