import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

console.log(process.env.WORKOS_CLIENT_ID)
console.log(process.env.WORKOS_API_KEY)
console.log(process.env.WORKOS_TOKEN_AUDIENCE)
console.log(process.env.WORKOS_TOKEN_ISSUER)
console.log(process.env.DATABASE_URL)

// import { env } from "./data/env.ts";
import outingRoutes from "./routes/outings.ts";

const app = new Hono();

app.use("*", cors({ origin: process.env.NEXT_PUBLIC_APP_URL }));

app.route("/outings", outingRoutes);

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT) || 8080,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
