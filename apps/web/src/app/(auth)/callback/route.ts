import { handleAuth } from "@workos-inc/authkit-nextjs";
import { env } from "@/lib/env";
import { outingsPath } from "@/lib/paths";

export const GET = handleAuth({
	baseURL: env.NEXT_PUBLIC_APP_URL,
	returnPathname: outingsPath(),
});
