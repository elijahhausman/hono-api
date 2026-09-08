"use server";

import { request } from "@/lib/api";

export async function createOuting() {
	const data = await request.get("/outings");

	return data.message;
}
