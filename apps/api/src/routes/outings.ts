import { Hono } from "hono";

import { requireAuth } from "../middleware/auth.js";
import { getOutings } from "../services/outings.js";

const app = new Hono();

app.get("/", requireAuth, async (c) => {
  const outings = await getOutings();

  return c.json({ outings });
});

export default app;
