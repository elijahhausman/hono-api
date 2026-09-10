import "server-only";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { env } from "./env";
import { loginPath } from "./paths";

type Method = "GET" | "POST" | "PUT" | "DELETE";

type ApiResponse = {
	success: boolean;
	data: any;
	error: string | null;
};

export async function api(
	path: string,
	method: Method,
	body?: unknown,
): Promise<ApiResponse> {
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
				`An unknown error has occured :P (status code ${res.status}).`;

			return {
				success: false,
				data: null,
				error,
			};
		}

		const data = await res.json();
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
	get: (path: string) => api(path, "GET"),
	post: (path: string, body?: unknown) => api(path, "POST", body),
	put: (path: string, body?: unknown) => api(path, "PUT", body),
	delete: (path: string, body?: unknown) => api(path, "DELETE", body),
});
