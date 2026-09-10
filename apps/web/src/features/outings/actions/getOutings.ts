"use server";

import { request } from "@/lib/api";
import type { Outing } from "../types";

export async function getOutings() {
	const result = await request.get("/outings");

	if (!result.success) {
		console.error(result.error);
		return [];
	}

	return result.data.outings as Outing[];
}
