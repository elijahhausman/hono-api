import { handleAuth } from "@workos-inc/authkit-nextjs";
import { outingsPath } from "@/lib/paths";

export const GET = handleAuth({ returnPathname: outingsPath() });
