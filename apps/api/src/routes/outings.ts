import { Hono } from "hono";

import { getUserName } from "../lib/workos.js";
import { requireAuth } from "../middleware/auth.js";

const app = new Hono();

app.get("/", requireAuth, async (c) => {
  const session = c.get("session");

  return c.json({
    message: `Hello ${await getUserName(session.userId)} from Hono on Turbo!`,
  });
});

export default app;
