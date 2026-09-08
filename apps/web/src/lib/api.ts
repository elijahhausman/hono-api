import "server-only";
import { withAuth } from "@workos-inc/authkit-nextjs";

interface RequestOptions extends Omit<RequestInit, "body" | "headers"> {
	body?: unknown;
}

async function request<T>(
	path: string,
	options: RequestOptions = {},
): Promise<T> {
	const { accessToken } = await withAuth({ ensureSignedIn: true });

	const res = await fetch(`${process.env.API_BASE_URL}${path}`, {
		...options,
		headers: {
			Authorization: `Bearer ${accessToken}`,
			...(options.body !== undefined && { "Content-Type": "application/json" }),
		},
		body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
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

export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "GET" }),

	post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "POST", body }),

	put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "PUT", body }),

	patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "PATCH", body }),

	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "DELETE" }),
};
