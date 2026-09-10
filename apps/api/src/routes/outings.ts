import { Hono } from "hono";

import { getUserName } from "../lib/workos.js";
import { requireAuth } from "../middleware/auth.js";
import { getOutings } from "../services/outings.js";

const app = new Hono();

app.get("/", requireAuth, async (c) => {
  const session = c.get("session");
  const outings = await getOutings();

  const name = await getUserName(session.userId);

  console.log(`Outings requested by ${name}`);

  return c.json({ outings });
});

export default app;
