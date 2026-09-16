"use server";

import type { Outing } from "@workspace/schemas";
import { request } from "@/lib/api";

export async function getOutings() {
	return await request.get<{ outings: Outing[] }>("/outings");
}
