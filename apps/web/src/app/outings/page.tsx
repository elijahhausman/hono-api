import Link from "next/link";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { OutingsList } from "@/features/outings/components/outings-list";

function OutingsPage() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="flex flex-col items-center justify-center space-y-8 px-4 md:px-6">
				<p className="max-w-175 md:text-xl">
					Here are the outings in response to your API call:
				</p>

				<Suspense fallback={<Spinner />}>
					<OutingsList />
				</Suspense>

				<Button variant="default" asChild>
					<Link href="/">Reload outings</Link>
				</Button>
			</div>
		</section>
	);
}

export default OutingsPage;
