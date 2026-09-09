import "server-only";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { env } from "./env";
import { loginPath } from "./paths";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type ApiResponse = {
	success: boolean;
	data: string | null;
	error: string | null;
};

export async function api(
	path: string,
	method: Method,
	body?: unknown,
): Promise<ApiResponse> {
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

	if (res.status === 403) {
		return {
			success: false,
			data: null,
			error: "You don't have access to this resource.",
		};
	}

	if (res.status === 503) {
		return {
			success: false,
			data: null,
			error:
				"The service is temporarily unavailable. Please try again shortly.",
		};
	}

	if (!res.ok) {
		return {
			success: false,
			data: null,
			error: `Request failed (${res.status}). Please try again.`,
		};
	}

	const data = await res.json();
	return { success: true, data, error: null };
}

export const request = Object.assign(api, {
	get: (path: string) => api(path, "GET"),
	post: (path: string, body?: unknown) => api(path, "POST", body),
	put: (path: string, body?: unknown) => api(path, "PUT", body),
	delete: (path: string, body?: unknown) => api(path, "DELETE", body),
});
