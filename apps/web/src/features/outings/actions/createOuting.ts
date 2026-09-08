"use server";

import { api } from "@/lib/api";

export async function createOuting() {
	const data = await api.get<{ message: string }>("/outings");

	return { message: data.message };
}
