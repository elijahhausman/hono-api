import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { env } from "./data/env.js";
import outingRoutes from "./routes/outings.js";

const app = new Hono();
const port = Number(process.env.PORT) || 3000;

app.use("*", cors({ origin: env.WEB_APP_BASE_URL }));

app.route("/outings", outingRoutes);

serve(
  {
    fetch: app.fetch,
    port: port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
