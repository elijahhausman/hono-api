import { handleAuth } from "@workos-inc/authkit-nextjs";
import { outingsPath } from "@/lib/paths";

// Uses process instead of the @/lib/env.ts helper because the non NEXT_PUBLIC_*
// variables aren't available at build time and therefore cause the application to crash

export const GET = handleAuth({
	baseURL: process.env.NEXT_PUBLIC_APP_URL,
	returnPathname: outingsPath(),
});
