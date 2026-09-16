"use server";

import type { Outing } from "@workspace/schemas";
import { request } from "@/lib/api";

export async function getOuting(id: string) {
	return await request.get<{ outing: Outing }>(`/outings/${id}`);
}
