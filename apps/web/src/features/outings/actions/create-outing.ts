"use server";

import type { CreateOutingSchema } from "@workspace/schemas";
import { request } from "@/lib/api";

export async function createOuting(data: CreateOutingSchema) {
	return await request.post<{ data: CreateOutingSchema }>(`/outings`, data);
}
