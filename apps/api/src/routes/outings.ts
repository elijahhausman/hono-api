import { Hono } from "hono";

import { requireAuth } from "../middleware/auth.ts";
import { getOutings } from "../services/outings.ts";

const app = new Hono();

app.get("/", requireAuth, async (c) => {
  const outings = await getOutings();

  return c.json({ outings });
});

export default app;
