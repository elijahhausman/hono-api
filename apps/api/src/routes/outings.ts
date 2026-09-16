import { sValidator } from "@hono/standard-validator";
import { createOuting, getOuting, getOutings, isPrismaError } from "@workspace/db";
import { createOutingSchema } from "@workspace/schemas";
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

app.post("/", requireAuth, sValidator("json", createOutingSchema), async (c) => {
  const data = c.req.valid("json");
  const result = await createOuting(data);

  if (isPrismaError(result)) {
    return c.json({ message: result.error }, result.status as any);
  }

  return c.json({ outing: result });
});

export default app;
