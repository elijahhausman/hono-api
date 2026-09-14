"use server";

import { request } from "@/lib/api";
import type { Outing } from "../types";

export async function getOuting(id: string) {
	return await request.get<{ outing: Outing }>(`/outings/${id}`);
}
