"use server";

import type { CreateOuting } from "@workspace/schemas";
import { request } from "@/lib/api";

export async function createOuting(data: CreateOuting) {
	return await request.post<{ outing: { id: string } }>(`/outings`, data);
}
