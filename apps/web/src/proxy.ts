import { authkitProxy } from "@workos-inc/authkit-nextjs";

export default authkitProxy({
	middlewareAuth: {
		enabled: true,
		unauthenticatedPaths: ["/login", "/callback"],
	},
});

export const config = { matcher: ["/", "/outings", "/outings/:id*"] };
