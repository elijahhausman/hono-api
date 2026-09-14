"use server";

import { request } from "@/lib/api";
import type { Outing } from "../types";

export async function getOutings() {
	return await request.get<{ outings: Outing[] }>("/outings");
}
