import "server-only";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { env } from "./env";

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
		const body = await res.json();

		if (body.error === "token_expired") {
			throw new Error("unauthorized");
		}

		throw new Error("invalid_token");
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
