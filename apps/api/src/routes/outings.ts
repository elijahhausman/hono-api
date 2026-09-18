import { sValidator } from "@hono/standard-validator";
import {
  createOuting,
  deleteOuting,
  getOuting,
  getOutings,
  isPrismaError,
  updateOuting,
} from "@workspace/db";
import { createOutingSchema, updateOutingSchema } from "@workspace/schemas";
import { Hono } from "hono";

import { requireAuth } from "../middleware/auth.ts";

const app = new Hono();

app.onError((error, c) => {
  if (isPrismaError(error)) {
    return c.json({ error: error.error }, error.status as any);
  }

  return c.json({ message: "An unexpected error has occured. Please try again." }, 500);
});

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
  const outing = await createOuting(data);

  return c.json({ outing }, 201);
});

app.patch("/:id", requireAuth, sValidator("json", updateOutingSchema), async (c) => {
  const id = c.req.param("id");
  const data = c.req.valid("json");

  await updateOuting(id, data);

  return c.body(null, 204);
});

app.delete("/:id", requireAuth, async (c) => {
  const id = c.req.param("id");
  await deleteOuting(id);

  return c.body(null, 204);
});

export default app;
