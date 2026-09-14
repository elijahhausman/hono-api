import "server-only";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { env } from "./env";
import { loginPath } from "./paths";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type ApiResponse<T> =
	| { success: true; data: T; error: null }
	| { success: false; data: null; error: string };

export async function api<T>(
	path: string,
	method: Method,
	body?: unknown,
): Promise<ApiResponse<T>> {
	try {
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

		if (!res.ok) {
			let data = null;

			try {
				data = await res.json();
			} catch {}

			const error =
				data?.message ||
				data?.error ||
				`An unknown error has occured (status code ${res.status}).`;

			return {
				success: false,
				data: null,
				error,
			};
		}

		const data = (await res.json()) as T;
		return { success: true, data, error: null };
	} catch (error: any) {
		if (isRedirectError(error)) {
			throw error;
		}

		return {
			success: false,
			data: null,
			error: error.message || "An unexpected error occurred.",
		};
	}
}

export const request = Object.assign(api, {
	get: <T>(path: string) => api<T>(path, "GET"),
	post: <T>(path: string, body?: unknown) => api<T>(path, "POST", body),
	put: <T>(path: string, body?: unknown) => api<T>(path, "PUT", body),
	delete: <T>(path: string, body?: unknown) => api<T>(path, "DELETE", body),
});
