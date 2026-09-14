import { getOuting, getOutings } from "@workspace/db";
import { Hono } from "hono";

import { requireAuth } from "../middleware/auth.ts";

const app = new Hono();

app.get("/", requireAuth, async (c) => {
  const outings = await getOutings();

  return c.json({ outings });
});

app.get("/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  const outing = await getOuting(id);

  return c.json({ outing });
});

export default app;
