import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

// import { env } from "./data/env.ts";
import outingRoutes from "./routes/outings.ts";

const app = new Hono();

app.use("*", cors({ origin: process.env.NEXT_PUBLIC_APP_URL }));

app.route("/outings", outingRoutes);

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
