"use server";

import { request } from "@/lib/api";

export async function getOutings() {
	return await request.get("/outings");
}
