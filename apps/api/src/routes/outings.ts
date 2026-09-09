import { Hono } from "hono";

import { getUserName } from "../lib/workos.js";
import { requireAuth } from "../middleware/auth.js";

const app = new Hono();

app.get("/", requireAuth, async (c) => {
  const session = c.get("session");
  const name = await getUserName(session.userId);

  if (name !== "Elijah Hausman") {
    return c.json({ message: "You don't have permission to access this." }, 403);
  }

  return c.json({ message: `Hello ${name} from Hono on Turbo!` });
});

export default app;
