"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createOuting } from "@/features/outings/actions/createOuting";

function Home() {
	const [message, setMessage] = useState<string>();

	useEffect(() => {
		const fetchData = async () => {
			const res = await createOuting();

			if (!res.success) {
				setMessage(res.error ?? "Failed to fetch data.");
			} else {
				setMessage(res.data?.message ?? "Success!");
			}
		};

		fetchData();
	}, []);

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="flex flex-col items-center justify-center space-y-4 px-4 md:px-6">
				<p className="max-w-175 text-gray-500 md:text-xl dark:text-gray-400">
					Here is the response to your API call:
				</p>

				<h1 className="font-bold text-xl tracking-tighter sm:text-2xl md:text-3xl lg:text-4xl/none">
					{!message ? "Loading..." : message}
				</h1>

				<Button variant="default" asChild>
					<Link href="/">View the API call</Link>
				</Button>
			</div>
		</section>
	);
}

export default Home;
