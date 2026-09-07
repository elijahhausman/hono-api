"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function Home() {
	const [message, setMessage] = useState<string>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch("http://localhost:3001/");
				const data = await res.json();

				setMessage(data.message);
			} catch (error) {
				console.error("Failed to fetch API:", error);
				setMessage("Failed to load message");
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

				<h1 className="font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
					{!message ? "Loading..." : message}
				</h1>

				<Link
					href="/"
					className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 font-medium text-gray-50 text-sm shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
					prefetch={false}
				>
					View the API call
				</Link>
			</div>
		</section>
	);
}

export default Home;
