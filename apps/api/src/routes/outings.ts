import { Hono } from "hono";

import { requireAuth } from "../middleware/auth.js";
import { getOutings } from "../services/outings.js";

const app = new Hono();

app.get("/", requireAuth, async (c) => {
  const outings = await getOutings();
  const outing = outings[0];

  if (!outing) {
    return c.json({ message: "Unable to find any outings" });
  }

  return c.json({ message: outing.title });
});

export default app;
