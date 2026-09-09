import "server-only";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { env } from "./env";
import { loginPath } from "./paths";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export async function api(path: string, method: Method, body?: unknown) {
	const { accessToken } = await withAuth({ ensureSignedIn: true });

	const res = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			...(body ? { "Content-Type": "application/json" } : {}),
		},
		...(body ? { body: JSON.stringify(body) } : {}),
		cache: "no-store",
	});

	if (res.status === 401) {
		redirect(loginPath());
	}

	if (res.status === 503) {
		throw new Error("verification_unavailable");
	}

	if (!res.ok) {
		throw new Error(`request_failed: ${res.status}`);
	}

	return res.json();
}

export const request = Object.assign(api, {
	get: (path: string) => api(path, "GET"),
	post: (path: string, body?: unknown) => api(path, "POST", body),
	put: (path: string, body?: unknown) => api(path, "PUT", body),
	delete: (path: string, body?: unknown) => api(path, "DELETE", body),
});
