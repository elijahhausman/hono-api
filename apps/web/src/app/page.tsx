import { withAuth } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { outingsPath } from "@/lib/paths";

export default async function ProtectedPage() {
	await withAuth({ ensureSignedIn: true });

	redirect(outingsPath());
}
