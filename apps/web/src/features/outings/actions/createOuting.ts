"use server";

import { request } from "@/lib/api";

export async function createOuting() {
	return await request.get("/outings");
}
